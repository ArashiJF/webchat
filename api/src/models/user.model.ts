import {Entity, model, property} from '@loopback/repository';

//the user model has 3 attributes, id, username and password
//we dont pass the id in the usercontroller so the database can create one for us

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<User>) {
    super(data);
  }
}
