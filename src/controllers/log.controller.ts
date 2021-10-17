import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Log} from '../models';
import {LogRepository} from '../repositories';
import {logHandle} from '../transformers';

export class LogController {
  constructor(
    @repository(LogRepository)
    public logRepository: LogRepository,
  ) { }

  @post('/log')
  @response(200, {
    description: 'Log model instance',
    content: {'application/json': {schema: getModelSchemaRef(Log)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Log, {
            title: 'NewLog',

          }),
        },
      },
    })
    log: Log,
  ): Promise<Log> {
    return this.logRepository.create(log);
  }

  @get('/log/count')
  @response(200, {
    description: 'Log model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Log) where?: Where<Log>,
  ): Promise<Count> {
    return this.logRepository.count(where);
  }

  @get('/log')
  @response(200, {
    description: 'Array of Log model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Log, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Log) filter?: Filter<Log>,
  ): Promise<Log[]> {
    return this.logRepository.find(filter);
  }

  @get('/log_js')
  @response(200, {
    description: 'Array of Log model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Log, {includeRelations: true}),
        },
      },
    },
  })
  async _find(
    @param.filter(Log) filter?: Filter<Log>,
  ): Promise<any[]> {
    return this.logRepository.find(filter).then(data => data.map(v => logHandle(v)));
  }

  @patch('/log')
  @response(200, {
    description: 'Log PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Log, {partial: true}),
        },
      },
    })
    log: Log,
    @param.where(Log) where?: Where<Log>,
  ): Promise<Count> {
    return this.logRepository.updateAll(log, where);
  }

  @get('/log/{id}')
  @response(200, {
    description: 'Log model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Log, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Log, {exclude: 'where'}) filter?: FilterExcludingWhere<Log>
  ): Promise<Log> {
    return this.logRepository.findById(id, filter);
  }

  @patch('/log/{id}')
  @response(204, {
    description: 'Log PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Log, {partial: true}),
        },
      },
    })
    log: Log,
  ): Promise<void> {
    await this.logRepository.updateById(id, log);
  }

  @put('/log/{id}')
  @response(204, {
    description: 'Log PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() log: Log,
  ): Promise<void> {
    await this.logRepository.replaceById(id, log);
  }

  @del('/log/{id}')
  @response(204, {
    description: 'Log DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.logRepository.deleteById(id);
  }
}
