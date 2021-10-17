import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Transaction,
  Block,
} from '../models';
import {TransactionRepository} from '../repositories';

export class TransactionBlockController {
  constructor(
    @repository(TransactionRepository)
    public transactionRepository: TransactionRepository,
  ) { }

  @get('/transactions/{id}/block', {
    responses: {
      '200': {
        description: 'Block belonging to Transaction',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Block)},
          },
        },
      },
    },
  })
  async getBlock(
    @param.path.string('id') id: typeof Transaction.prototype.id,
  ): Promise<Block> {
    return this.transactionRepository.block(id);
  }
}
