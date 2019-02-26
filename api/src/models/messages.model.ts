import {Entity, model, property} from '@loopback/repository';

//the Messages module to add said attribute in the chat model.

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
