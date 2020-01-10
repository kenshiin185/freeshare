import {DefaultCrudRepository} from '@loopback/repository';
import {SourcesBdd, SourcesBddRelations} from '../models';
import {FreesharedsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SourcesBddRepository extends DefaultCrudRepository<
  SourcesBdd,
  typeof SourcesBdd.prototype._id,
  SourcesBddRelations
> {
  constructor(
    @inject('datasources.freeshareds') dataSource: FreesharedsDataSource,
  ) {
    super(SourcesBdd, dataSource);
  }
}
