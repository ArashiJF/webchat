//ALL imports, some are unused by being created by the CLI
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Chats, User} from '../models';
import {ChatsRepository, UserRepository} from '../repositories';
import { inject } from '@loopback/context';
import { authenticate, AuthenticationBindings } from '@loopback/authentication';


export class ChatsController {
  constructor(
    //we import chatrepository along with the userrepository for queries.
    @repository(ChatsRepository)
    public chatsRepository : ChatsRepository,
    @repository(UserRepository)
    public userRepository : UserRepository,
    @inject(AuthenticationBindings.CURRENT_USER, {optional: true})
    private user: {name: string; id: string; token: string}
  ) {}
    
  //All the endpoints are protected with Bearer strategy authentication
  //so the only way to access these endpoints is by first login into the database
  //through authentication provider


  //Create a new chat with a person
  //this applies to both user and group chat
  @authenticate('BearerStrategy')
  @post('/chats', {
    responses: {
      '200': {
        description: 'Chats model instance',
        content: {'application/json': {schema: {'x-ts-type': Chats}}},
      },
    },
  })
  async create(
    @requestBody() chats: Chats): Promise<Chats> {
    return await this.chatsRepository.create(chats);
  }

  //search a chat by the user id
  //doesnt matter if its a group or a single chat
  //if a userid is inside the userlist parameter of Chats,
  //then those chats will be returned
  @authenticate('BearerStrategy')
  @get('/chats', {
    responses: {
      '200': {
        description: 'Chats model instance',
        content: {'application/json': {schema: {'x-ts-type': Chats}}},
      },
    },
  })
  async findchats(@param.query.string('userid') userid: string): Promise<Chats[]> {
  return await this.chatsRepository.find()
  .then(chats => chats.filter(chat => (chat.userlist.indexOf(userid)! == -1)));
  }


  //For saving the messages that are being sent in the chat, we will need to
  //update the Messages[] array constantly
  @authenticate('BearerStrategy')
  @put('/chats', {
    responses: {
      '204': {
        description: 'Chats PUT success',
      },
    },
  })
  async replaceById(
    @param.query.string('id') id: string,
    @requestBody() chats: Chats,
  ): Promise<void> {
    await this.chatsRepository.replaceById(id, chats);
  }

  //This endpoint so far only takes into account the deletion of a chat
  //and because its the information from the database, it will be deleted
  //for all users!
  @authenticate('BearerStrategy')
  @del('/chats/', {
    responses: {
      '204': {
        description: 'Chats DELETE success',
      },
    },
  })
  async deleteById(@param.query.string('id') id: string): Promise<void> {
    await this.chatsRepository.deleteById(id);
  }
}
