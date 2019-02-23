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
