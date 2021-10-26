import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {ProviderDataSource} from '../datasources';
import {Contract, State, StateRelations} from '../models';
import {ContractRepository} from './contract.repository';
import {TransactionRepository} from './transaction.repository';

export class StateRepository extends DefaultCrudRepository<
  State,
  typeof State.prototype.id,
  StateRelations
> {

  public readonly contract: BelongsToAccessor<Contract, typeof State.prototype.id>;
  public readonly transactionRepository: Promise<TransactionRepository>;
  public readonly contractRepository: Promise<ContractRepository>;

  constructor(
    @inject('datasources.provider') dataSource: ProviderDataSource,
    @repository.getter('ContractRepository') protected contractRepositoryGetter: Getter<ContractRepository>,
    @repository.getter('TransactionRepository') protected txRepositoryGetter: Getter<TransactionRepository>,
  ) {
    super(State, dataSource);
    this.contract = this.createBelongsToAccessorFor('contract', contractRepositoryGetter,);
    this.registerInclusionResolver('contract', this.contract.inclusionResolver);
    this.transactionRepository = txRepositoryGetter();
    this.contractRepository = contractRepositoryGetter();
  }
}
