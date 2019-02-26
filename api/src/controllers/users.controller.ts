import {
  Count,
  CountSchema,
  repository,
  Where,
  Fields
} from '@loopback/repository';
import {
  post,
  param,
  get,
  put,
  del,
  requestBody,
  getFieldsJsonSchemaFor,
} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';
import { inject } from '@loopback/context';
import { authenticate, AuthenticationBindings } from '@loopback/authentication';


export class UsersController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
    @inject(AuthenticationBindings.CURRENT_USER, {optional: true})
    private user: {name: string; id: string; token: string},
  ) {}
  
  // this function checks for us wether the username is not taken already
  async checkname(Name: string, ID?: string){
    let x = false;
    
    //if we pass the id we are taking into account the user wants to change the password and not the username
    //but the function would mistakenly mark it as duplicate when he sends the same username so we need to add

    if (ID){
      //where looks for any username that doesnt belong to the current user id, that way we ignore if the user
      //sends his same username to update it for any reason but also we check for username duplicates
      await this.userRepository.findOne({where: {and: [{username:Name}, {id: {neq: ID}}]}})
      .then(
        u => {
          if (u){
            x = true;
          }
        }
      )

    }
    //if an ID is not sent then we just check wether the username is already taken or not
    else{
      await this.userRepository.findOne({where: {username: Name}})
      .then( u => {
        if (u){
          x = true;
        }
      });
    }
    return x;
  }

  // we can post a user as long as it doesnt exist in the database!

  @post('/users/newuser', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
      '400': {
        description: 'that username seems taken',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      }
    },
  })
  async create(@requestBody() user: User): Promise<User> {
    let check = await this.checkname(user.username);
    if (!check){
      return await this.userRepository.create(user);
    }
    return Promise.reject({status: 400})
  }

  //getting a list of all the users in the database, from here onwards we will apply authentication.for that
  //We will add a post for login
  //the login uses a basic HTTP strategy for authentication
  //after that we get a token in response.
  @authenticate('BasicStrategy')
  @post('/users/login')
  async login(){
    return {token: this.user.token};
  }

  //We will use bearer strategy to use the token when the user logs in
  @authenticate('BearerStrategy')
  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': User}},
          },
        },
      },
    },
  })
  async find(): Promise<User[]> {
    return await this.userRepository.find({fields: {username: true,id: true}});
  }

  //if we need to get some user in special
  @authenticate('BearerStatregy')
  @get('/user', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
    },
  })
  async findById(@param.query.string('id') id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  //Endpoint to edit the username
  @authenticate('BearerStrategy')
  @put('/users', {
    responses: {
      '204': {
        description: 'User PUT success',
      },
    },
  })
  async edituser(
    @requestBody() request: User){ 
    
    // if the username wants to get changed we need to check if the new one is duplicated
    let a = await this.checkname(request.username,request.id);
    
    //if its not duplicated we change it and save it, if it is, its rejected
    if (!a){
      return await this.userRepository.findById(request.id).then(
        newdata => {
          newdata.username = request.username ? request.username : newdata.username;
          this.userRepository.save(newdata);
          return Promise.resolve({status: 200});
        },
        () => Promise.reject({status: 400})
      );
    }

  }

  //If we want to change the password
  @authenticate('BearerStrategy')
  @put('/users/password/', {
    responses: {
      '200': {
        description: 'password changed',
      }
    }
  })async editpassword(
    @param.query.password('pass') pass: string,
    @requestBody() request: User){
      let a = await this.userRepository.findById(request.id).then(
        newpass =>{
          newpass.password = request.password;
          this.userRepository.save(newpass);
          return Promise.resolve({status: 200})
        },
        () => Promise.reject({status: 400})
      )
  }

}
