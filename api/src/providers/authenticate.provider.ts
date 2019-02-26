import { Provider, inject, ValueOrPromise } from '@loopback/context';
import { Strategy } from 'passport';
import { AuthenticationBindings, AuthenticationMetadata } from '@loopback/authentication';
import { BasicStrategy } from 'passport-http';
import { Strategy as BearerStrategy} from 'passport-http-bearer';
import { UserRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { verify, sign } from 'jsonwebtoken';

//We can use dependency injection to add even more types of authentication protocols
//Most of this code was taken from this github repository, which corresponds
//to project from UTB, https://github.com/IngenieriaDeSistemasUTB/aquappservice
//which said provider was based off from the github repo where its explained how to
//add authentication bindings for LoopBack 
//https://github.com/strongloop/loopback-next/tree/master/packages/authentication
//its explained the steps to take and what to do mostly for the dependency injection for the authentication 
//provider.

export class AuthenticationProvider implements Provider<Strategy | undefined> {
    constructor(
        @inject(AuthenticationBindings.METADATA)
        private metadata: AuthenticationMetadata,
        @repository(UserRepository) public userRepository: UserRepository,
    ) {}
    

    value(): ValueOrPromise<Strategy | undefined>{
        // if the function was not decorated we dont need to apply authentication
        if (!this.metadata){
            return undefined;
        }

        const name = this.metadata.strategy;
        // we use the switch statement to add more than one authentication strategy
        switch(name){
            case 'BasicStrategy':
                return new BasicStrategy(
                    (
                        username: string,
                        password: string,
                        cb: (
                            err: Error | null,
                            user?:
                            | { name: string; id: string | undefined; token: string}
                            | false, 
                        ) => void
                    ) => this.verifyBasic(username, password, cb),
                );

                case 'BearerStrategy':
                return new BearerStrategy(
                    (
                        token: string,
                        cb: (
                            err: Error | null,
                            user?: {name: string; id: string; token: string}
                            | false,                        
                        ) => void
                    ) => this.verifytoken(token,cb),
                );
            
            default:
                return Promise.reject({messae: 'Strategy ${name} not implemented, sorry', status: 400})
        }
    } 
    /*   
     * we will now verify the user credentials to log in
     */
    async verifyBasic(
        username: string,
        password: string,
        cb: (
            err: Error | null,
            user?:
            | {name: string; id: string | undefined; token: string}
            | false,
        ) => void,
    ){
        //we need to find the user that is trying to log in into the database
        await this.userRepository.find()
        .then(
        users => {
            //we use filter to check wether the username and the password match,
            //if they do then its added in the finder constant var
            const finder = users.filter(    
                u => u.username === username && u.password === password,
            );
            if (finder.length === 0){
                //didnt find any user with that username and password
                cb(null, false);
                return;
            }
            // we take the user found from finder and add it to the user var
            // now we create the callback for authentication
            const user = finder[0];

            cb(null, {
                id: user.id,
                name: user.username,    
                token: sign(
                    {name: username, id: user.id},
                     process.env.SECRET_KEY || 'nobume',
                )
            });
          }, //error catchs
          reason => {
              cb(reason, false);
          },
        
        ).catch(reason => {
           cb(reason, false);
        });
    }
    
    //For the bearer strategy we use the function verify from jsonwebtoken
    async verifytoken(
        token: string,
        cb: (err: Error | null, user?: any) => void,
    ){
        try {
            let payload: any = verify(
                token, process.env.SECRET_KEY || 'nobume'
            );
            cb(null, payload);
        } catch (err){
            //invalid token
            cb(err, false);
        }
    }
        
}
