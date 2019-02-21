import {Entity, model, property} from '@loopback/repository';

@model()
export class Messages extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  text: string;

  constructor(data?: Partial<Messages>) {
    super(data);
  }
}
