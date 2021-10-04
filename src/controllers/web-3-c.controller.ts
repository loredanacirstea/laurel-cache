import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Web3C} from '../models';
import {Web3CRepository} from '../repositories';

export class Web3CController {
  constructor(
    @repository(Web3CRepository)
    public web3CRepository : Web3CRepository,
  ) {}

  @post('/web3c')
  @response(200, {
    description: 'Web3C model instance',
    content: {'application/json': {schema: getModelSchemaRef(Web3C)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Web3C, {
            title: 'NewWeb3C',
            
          }),
        },
      },
    })
    web3C: Web3C,
  ): Promise<Web3C> {
    return this.web3CRepository.create(web3C);
  }

  @get('/web3c/count')
  @response(200, {
    description: 'Web3C model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Web3C) where?: Where<Web3C>,
  ): Promise<Count> {
    return this.web3CRepository.count(where);
  }

  @get('/web3c')
  @response(200, {
    description: 'Array of Web3C model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Web3C, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Web3C) filter?: Filter<Web3C>,
  ): Promise<Web3C[]> {
    return this.web3CRepository.find(filter);
  }

  @patch('/web3c')
  @response(200, {
    description: 'Web3C PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Web3C, {partial: true}),
        },
      },
    })
    web3C: Web3C,
    @param.where(Web3C) where?: Where<Web3C>,
  ): Promise<Count> {
    return this.web3CRepository.updateAll(web3C, where);
  }

  @get('/web3c/{id}')
  @response(200, {
    description: 'Web3C model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Web3C, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Web3C, {exclude: 'where'}) filter?: FilterExcludingWhere<Web3C>
  ): Promise<Web3C> {
    return this.web3CRepository.findById(id, filter);
  }

  @patch('/web3c/{id}')
  @response(204, {
    description: 'Web3C PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Web3C, {partial: true}),
        },
      },
    })
    web3C: Web3C,
  ): Promise<void> {
    await this.web3CRepository.updateById(id, web3C);
  }

  @put('/web3c/{id}')
  @response(204, {
    description: 'Web3C PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() web3C: Web3C,
  ): Promise<void> {
    await this.web3CRepository.replaceById(id, web3C);
  }

  @del('/web3c/{id}')
  @response(204, {
    description: 'Web3C DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.web3CRepository.deleteById(id);
  }
}
