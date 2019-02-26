import {DefaultCrudRepository} from '@loopback/repository';
import {User} from '../models';
import {ChatdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  constructor(
    @inject('datasources.chatdb') dataSource: ChatdbDataSource,
  ) {
    super(User, dataSource);
  }
}
