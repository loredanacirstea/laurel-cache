import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  State,
  Contract,
} from '../models';
import {StateRepository} from '../repositories';

export class StateContractController {
  constructor(
    @repository(StateRepository)
    public stateRepository: StateRepository,
  ) { }

  @get('/states/{id}/contract', {
    responses: {
      '200': {
        description: 'Contract belonging to State',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Contract)},
          },
        },
      },
    },
  })
  async getContract(
    @param.path.number('id') id: typeof State.prototype.id,
  ): Promise<Contract> {
    return this.stateRepository.contract(id);
  }
}
