import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Chats} from '../models';
import {ChatsRepository} from '../repositories';

export class ChatsController {
  constructor(
    @repository(ChatsRepository)
    public chatsRepository : ChatsRepository,
  ) {}

  @post('/chats', {
    responses: {
      '200': {
        description: 'Chats model instance',
        content: {'application/json': {schema: {'x-ts-type': Chats}}},
      },
    },
  })
  async create(@requestBody() chats: Chats): Promise<Chats> {
    return await this.chatsRepository.create(chats);
  }

  @get('/chats/count', {
    responses: {
      '200': {
        description: 'Chats model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Chats)) where?: Where,
  ): Promise<Count> {
    return await this.chatsRepository.count(where);
  }

  @get('/chats', {
    responses: {
      '200': {
        description: 'Array of Chats model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Chats}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Chats)) filter?: Filter,
  ): Promise<Chats[]> {
    return await this.chatsRepository.find(filter);
  }

  @patch('/chats', {
    responses: {
      '200': {
        description: 'Chats PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() chats: Chats,
    @param.query.object('where', getWhereSchemaFor(Chats)) where?: Where,
  ): Promise<Count> {
    return await this.chatsRepository.updateAll(chats, where);
  }

  @get('/chats/{id}', {
    responses: {
      '200': {
        description: 'Chats model instance',
        content: {'application/json': {schema: {'x-ts-type': Chats}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Chats> {
    return await this.chatsRepository.findById(id);
  }

  @patch('/chats/{id}', {
    responses: {
      '204': {
        description: 'Chats PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() chats: Chats,
  ): Promise<void> {
    await this.chatsRepository.updateById(id, chats);
  }

  @put('/chats/{id}', {
    responses: {
      '204': {
        description: 'Chats PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() chats: Chats,
  ): Promise<void> {
    await this.chatsRepository.replaceById(id, chats);
  }

  @del('/chats/{id}', {
    responses: {
      '204': {
        description: 'Chats DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.chatsRepository.deleteById(id);
  }
}
