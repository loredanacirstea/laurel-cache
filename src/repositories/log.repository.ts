import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ProviderDataSource} from '../datasources';
import {Log, LogRelations, Transaction} from '../models';
import {TransactionRepository} from './transaction.repository';

export class LogRepository extends DefaultCrudRepository<
  Log,
  typeof Log.prototype.id,
  LogRelations
> {

  public readonly transaction: BelongsToAccessor<Transaction, typeof Log.prototype.id>;

  constructor(
    @inject('datasources.provider') dataSource: ProviderDataSource, @repository.getter('TransactionRepository') protected transactionRepositoryGetter: Getter<TransactionRepository>,
  ) {
    super(Log, dataSource);
    this.transaction = this.createBelongsToAccessorFor('transaction', transactionRepositoryGetter,);
    this.registerInclusionResolver('transaction', this.transaction.inclusionResolver);
  }
}
