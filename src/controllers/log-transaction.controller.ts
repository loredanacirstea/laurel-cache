import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Log,
  Transaction,
} from '../models';
import {LogRepository} from '../repositories';

export class LogTransactionController {
  constructor(
    @repository(LogRepository)
    public logRepository: LogRepository,
  ) { }

  @get('/logs/{id}/transaction', {
    responses: {
      '200': {
        description: 'Transaction belonging to Log',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transaction)},
          },
        },
      },
    },
  })
  async getTransaction(
    @param.path.string('id') id: typeof Log.prototype.id,
  ): Promise<Transaction> {
    return this.logRepository.transaction(id);
  }
}
