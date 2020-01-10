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
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {SourcesBdd} from '../models';
import {SourcesBddRepository} from '../repositories';

export class SourcesCtrlController {
  constructor(
    @repository(SourcesBddRepository)
    public sourcesBddRepository : SourcesBddRepository,
  ) {}

  @post('/sources-bdds', {
    responses: {
      '200': {
        description: 'SourcesBdd model instance',
        content: {'application/json': {schema: getModelSchemaRef(SourcesBdd)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SourcesBdd, {
            title: 'NewSourcesBdd',
            
          }),
        },
      },
    })
    sourcesBdd: SourcesBdd,
  ): Promise<SourcesBdd> {
    return this.sourcesBddRepository.create(sourcesBdd);
  }

  @get('/sources-bdds/count', {
    responses: {
      '200': {
        description: 'SourcesBdd model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(SourcesBdd)) where?: Where<SourcesBdd>,
  ): Promise<Count> {
    return this.sourcesBddRepository.count(where);
  }

  @get('/sources-bdds', {
    responses: {
      '200': {
        description: 'Array of SourcesBdd model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SourcesBdd, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(SourcesBdd)) filter?: Filter<SourcesBdd>,
  ): Promise<SourcesBdd[]> {
    return this.sourcesBddRepository.find(filter);
  }

  @patch('/sources-bdds', {
    responses: {
      '200': {
        description: 'SourcesBdd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SourcesBdd, {partial: true}),
        },
      },
    })
    sourcesBdd: SourcesBdd,
    @param.query.object('where', getWhereSchemaFor(SourcesBdd)) where?: Where<SourcesBdd>,
  ): Promise<Count> {
    return this.sourcesBddRepository.updateAll(sourcesBdd, where);
  }

  @get('/sources-bdds/{id}', {
    responses: {
      '200': {
        description: 'SourcesBdd model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SourcesBdd, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(SourcesBdd)) filter?: Filter<SourcesBdd>
  ): Promise<SourcesBdd> {
    return this.sourcesBddRepository.findById(id, filter);
  }

  @patch('/sources-bdds/{id}', {
    responses: {
      '204': {
        description: 'SourcesBdd PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SourcesBdd, {partial: true}),
        },
      },
    })
    sourcesBdd: SourcesBdd,
  ): Promise<void> {
    await this.sourcesBddRepository.updateById(id, sourcesBdd);
  }

  @put('/sources-bdds/{id}', {
    responses: {
      '204': {
        description: 'SourcesBdd PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sourcesBdd: SourcesBdd,
  ): Promise<void> {
    await this.sourcesBddRepository.replaceById(id, sourcesBdd);
  }

  @del('/sources-bdds/{id}', {
    responses: {
      '204': {
        description: 'SourcesBdd DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sourcesBddRepository.deleteById(id);
  }
}
