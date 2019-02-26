import {Entity, model, property} from '@loopback/repository';
import { Messages } from './messages.model';

//The chat model maps to the table chats in Mongodb
//Each chat has an ID set up by the database or by socket.IO
//a title to recognize it, an array of the ids from the users 
//to know which user makes part of said chat, and the most important
//part, message atribute which is an array from the Messages model.
//Each message has an ID and a name.
//Lastly an attribute to know if the chat is a group chat or a normal chat


@model()
export class Chats extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    default: 'clever title'
  })
  title?: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  userlist: string[];

  @property({
    type: 'array',
    itemType: Messages,
    required: true,
  })
  message: Messages[];

  @property({
    type: 'number',
    required: true,
    default: 0
  })
  chattype: number;

  constructor(data?: Partial<Chats>) {
    super(data);
  }
}
