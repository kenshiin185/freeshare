import {DefaultCrudRepository} from '@loopback/repository';
import {Utilisateurs, UtilisateursRelations} from '../models';
import {FreesharedsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UtilisateursRepository extends DefaultCrudRepository<
  Utilisateurs,
  typeof Utilisateurs.prototype._id,
  UtilisateursRelations
> {
  constructor(
    @inject('datasources.freeshareds') dataSource: FreesharedsDataSource,
  ) {
    super(Utilisateurs, dataSource);
  }
}
