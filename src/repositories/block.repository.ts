import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProviderDataSource} from '../datasources';
import {Block, BlockRelations} from '../models';

export class BlockRepository extends DefaultCrudRepository<
  Block,
  typeof Block.prototype.hash,
  BlockRelations
> {
  constructor(
    @inject('datasources.provider') dataSource: ProviderDataSource,
  ) {
    super(Block, dataSource);
  }
}
