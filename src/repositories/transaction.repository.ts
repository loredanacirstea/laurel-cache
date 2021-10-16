import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProviderDataSource} from '../datasources';
import {Transaction, TransactionRelations} from '../models';

export class TransactionRepository extends DefaultCrudRepository<
  Transaction,
  typeof Transaction.prototype.hash,
  TransactionRelations
> {
  constructor(
    @inject('datasources.provider') dataSource: ProviderDataSource,
  ) {
    super(Transaction, dataSource);
  }
}
