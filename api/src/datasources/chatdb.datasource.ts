import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './chatdb.datasource.json';

export class ChatdbDataSource extends juggler.DataSource {
  static dataSourceName = 'chatdb';

  constructor(
    @inject('datasources.config.chatdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
