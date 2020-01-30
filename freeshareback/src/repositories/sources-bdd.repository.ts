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
/**
   *
   * @param toSearch
   */
  public async fullTextSearch(toSearch: string): Promise<any[]> {
    const tabRet: string[] = [];
    return new Promise<any[]>((resolve, reject) => {
      this.dataSource.connector!.execute!(this.entityClass.name, 'find', { $text: { $search: toSearch } },
        (err: any, data: any) => {
          if (err) reject(err);
          else {
            data.toArray((errT: any, documents: any) => {
              if (errT) {
                reject(errT);
                return;
              }
              resolve(documents);
            });
          }
        });
    });

  }

}
