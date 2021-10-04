import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Web3CDataSource} from '../datasources';
import {Web3C, Web3CRelations} from '../models';

export class Web3CRepository extends DefaultCrudRepository<
  Web3C,
  typeof Web3C.prototype.id,
  Web3CRelations
> {
  constructor(
    @inject('datasources.web3c') dataSource: Web3CDataSource,
  ) {
    super(Web3C, dataSource);
  }
}
