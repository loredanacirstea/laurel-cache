import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Transaction,
  Log,
} from '../models';
import {TransactionRepository} from '../repositories';

export class TransactionLogController {
  constructor(
    @repository(TransactionRepository) protected transactionRepository: TransactionRepository,
  ) { }

  @get('/transactions/{id}/logs', {
    responses: {
      '200': {
        description: 'Array of Transaction has many Log',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Log)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Log>,
  ): Promise<Log[]> {
    return this.transactionRepository.logs(id).find(filter);
  }

  @post('/transactions/{id}/logs', {
    responses: {
      '200': {
        description: 'Transaction model instance',
        content: {'application/json': {schema: getModelSchemaRef(Log)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Transaction.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Log, {
            title: 'NewLogInTransaction',
            exclude: ['id'],
            optional: ['transactionHash']
          }),
        },
      },
    }) log: Omit<Log, 'id'>,
  ): Promise<Log> {
    return this.transactionRepository.logs(id).create(log);
  }

  @patch('/transactions/{id}/logs', {
    responses: {
      '200': {
        description: 'Transaction.Log PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Log, {partial: true}),
        },
      },
    })
    log: Partial<Log>,
    @param.query.object('where', getWhereSchemaFor(Log)) where?: Where<Log>,
  ): Promise<Count> {
    return this.transactionRepository.logs(id).patch(log, where);
  }

  @del('/transactions/{id}/logs', {
    responses: {
      '200': {
        description: 'Transaction.Log DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Log)) where?: Where<Log>,
  ): Promise<Count> {
    return this.transactionRepository.logs(id).delete(where);
  }
}
