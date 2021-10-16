import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProviderDataSource} from '../datasources';
import {Contract, ContractRelations} from '../models';

export class ContractRepository extends DefaultCrudRepository<
  Contract,
  typeof Contract.prototype.id,
  ContractRelations
> {
  constructor(
    @inject('datasources.provider') dataSource: ProviderDataSource,
  ) {
    super(Contract, dataSource);
  }
}
