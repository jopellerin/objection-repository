import { entityNotFoundError } from './errors';
import {FindOptionsInterface, GetOptionsInterface, RepositoryInterface} from '../types/repository';

class Repository implements RepositoryInterface {
  readonly idColumn: string;

  private Model: {};

  constructor(Model: {}) {
    this.idColumn = Model.idColumn;
    this.Model = Model;
  }

  delete(id): Promise<void> {
    return new Promise(async (resolve) => {
      const model = await this.get(id);
      await model.$query()
        .delete();
      resolve();
    });
  }

  find<T>(cond, options: FindOptionsInterface): Promise<T[]> {
    const { columns, onQuery } = options;
    const query = this.Model.query()
      .where(cond);

    if (columns) {
      query.columns(columns);
    }

    if (onQuery) {
      onQuery(query);
    }

    return query;
  }

  get<T extends Object>(id, idColumn = null): Promise<T>;
  get<T extends Object>(id, options: GetOptionsInterface = {}): Promise<T> {
    let parsedOptions: GetOptionsInterface = {};
    if (typeof options === 'string') {
      parsedOptions = {
        idColumn: options,
      };
    } else {
      parsedOptions = options;
    }

    const {
      columns = [],
      idColumn = null,
      onQuery = null,
    } = parsedOptions;

    return new Promise(async (resolve, reject) => {
      const useColumn = idColumn || this.idColumn;
      const query = this.Model.query()
        .findOne({
          [useColumn]: id,
        });

      if (columns) {
        query.columns(columns);
      }

      if (onQuery) {
        onQuery(query);
      }

      const model = await query;

      if (!model) {
        reject(entityNotFoundError(this.Model.tableName, id, useColumn));
      }

      resolve(model);
    });
  }

  insert(data, { trx = null }): Promise<void> {
    return this.Model.query(trx)
      .insert(data);
  }

  update(id, data, { trx = null }): Promise<void> {
    return this.Model.query(trx)
      .update({
        ...data,
        id,
      });
  }
}

const repositoryFactory = (Model) => (
  new Repository(Model)
);

export default repositoryFactory;
