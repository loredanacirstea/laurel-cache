import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ProviderDataSource} from '../datasources';
import {Transaction, TransactionRelations, Block, Log} from '../models';
import {BlockRepository} from './block.repository';
import {LogRepository} from './log.repository';

export class TransactionRepository extends DefaultCrudRepository<
  Transaction,
  typeof Transaction.prototype.hash,
  TransactionRelations
> {

  public readonly block: BelongsToAccessor<Block, typeof Transaction.prototype.id>;

  public readonly logs: HasManyRepositoryFactory<Log, typeof Transaction.prototype.id>;

  constructor(
    @inject('datasources.provider') dataSource: ProviderDataSource, @repository.getter('BlockRepository') protected blockRepositoryGetter: Getter<BlockRepository>, @repository.getter('LogRepository') protected logRepositoryGetter: Getter<LogRepository>,
  ) {
    super(Transaction, dataSource);
    this.logs = this.createHasManyRepositoryFactoryFor('logs', logRepositoryGetter,);
    this.registerInclusionResolver('logs', this.logs.inclusionResolver);
    this.block = this.createBelongsToAccessorFor('block', blockRepositoryGetter,);
    this.registerInclusionResolver('block', this.block.inclusionResolver);
  }
}
