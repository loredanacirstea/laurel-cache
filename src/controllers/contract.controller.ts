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
import {Contract} from '../models';
import {ContractRepository} from '../repositories';

export class ContractController {
  constructor(
    @repository(ContractRepository)
    public contractRepository: ContractRepository,
  ) { }

  @post('/contract')
  @response(200, {
    description: 'Contract model instance',
    content: {'application/json': {schema: getModelSchemaRef(Contract)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contract, {
            title: 'NewContract',

          }),
        },
      },
    })
    contract: Contract,
  ): Promise<Contract> {
    return this.contractRepository.create(contract);
  }

  @get('/contract/count')
  @response(200, {
    description: 'Contract model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Contract) where?: Where<Contract>,
  ): Promise<Count> {
    return this.contractRepository.count(where);
  }

  @get('/contract')
  @response(200, {
    description: 'Array of Contract model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Contract, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Contract) filter?: Filter<Contract>,
  ): Promise<Contract[]> {
    return this.contractRepository.find(filter);
  }

  @patch('/contract')
  @response(200, {
    description: 'Contract PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contract, {partial: true}),
        },
      },
    })
    contract: Contract,
    @param.where(Contract) where?: Where<Contract>,
  ): Promise<Count> {
    return this.contractRepository.updateAll(contract, where);
  }

  @get('/contract/{id}')
  @response(200, {
    description: 'Contract model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Contract, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Contract, {exclude: 'where'}) filter?: FilterExcludingWhere<Contract>
  ): Promise<Contract> {
    return this.contractRepository.findById(id, filter);
  }

  @patch('/contract/{id}')
  @response(204, {
    description: 'Contract PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contract, {partial: true}),
        },
      },
    })
    contract: Contract,
  ): Promise<void> {
    await this.contractRepository.updateById(id, contract);
  }

  @put('/contract/{id}')
  @response(204, {
    description: 'Contract PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() contract: Contract,
  ): Promise<void> {
    await this.contractRepository.replaceById(id, contract);
  }

  @del('/contract/{id}')
  @response(204, {
    description: 'Contract DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.contractRepository.deleteById(id);
  }
}
