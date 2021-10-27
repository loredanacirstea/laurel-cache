import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Block,
  Transaction
} from '../models';
import {BlockRepository} from '../repositories';

export class BlockTransactionController {
  constructor(
    @repository(BlockRepository) protected blockRepository: BlockRepository,
  ) { }

  @get('/blocks/{id}/transactions', {
    responses: {
      '200': {
        description: 'Array of Block has many Transaction',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transaction)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Transaction>,
  ): Promise<Transaction[]> {
    return this.blockRepository.transactions(id).find(filter);
  }

  @post('/blocks/{id}/transactions', {
    responses: {
      '200': {
        description: 'Block model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transaction)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Block.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaction, {
            title: 'NewTransactionInBlock',
            exclude: ['id'],
            optional: ['block_number']
          }),
        },
      },
    }) transaction: Omit<Transaction, 'id'>,
  ): Promise<Transaction> {
    return this.blockRepository.transactions(id).create(transaction);
  }

  @patch('/blocks/{id}/transactions', {
    responses: {
      '200': {
        description: 'Block.Transaction PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaction, {partial: true}),
        },
      },
    })
    transaction: Partial<Transaction>,
    @param.query.object('where', getWhereSchemaFor(Transaction)) where?: Where<Transaction>,
  ): Promise<Count> {
    return this.blockRepository.transactions(id).patch(transaction, where);
  }

  @del('/blocks/{id}/transactions', {
    responses: {
      '200': {
        description: 'Block.Transaction DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Transaction)) where?: Where<Transaction>,
  ): Promise<Count> {
    return this.blockRepository.transactions(id).delete(where);
  }
}
