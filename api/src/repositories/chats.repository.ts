import {DefaultCrudRepository} from '@loopback/repository';
import {Chats} from '../models';
import {ChatdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ChatsRepository extends DefaultCrudRepository<
  Chats,
  typeof Chats.prototype.id
> {
  constructor(
    @inject('datasources.chatdb') dataSource: ChatdbDataSource,
  ) {
    super(Chats, dataSource);
  }
}
