import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ProviderDataSource} from '../datasources';
import {Block, BlockRelations, Transaction} from '../models';
import {TransactionRepository} from './transaction.repository';

export class BlockRepository extends DefaultCrudRepository<
  Block,
  typeof Block.prototype.hash,
  BlockRelations
> {

  public readonly transactions: HasManyRepositoryFactory<Transaction, typeof Block.prototype.id>;

  constructor(
    @inject('datasources.provider') dataSource: ProviderDataSource, @repository.getter('TransactionRepository') protected transactionRepositoryGetter: Getter<TransactionRepository>,
  ) {
    super(Block, dataSource);
    this.transactions = this.createHasManyRepositoryFactoryFor('transactions', transactionRepositoryGetter,);
    this.registerInclusionResolver('transactions', this.transactions.inclusionResolver);
  }
}
