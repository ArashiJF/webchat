import {Entity, model, property} from '@loopback/repository';
import { Messages } from './messages.model';

@model()
export class Chats extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

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


  constructor(data?: Partial<Chats>) {
    super(data);
  }
}
