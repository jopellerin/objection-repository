import { entityNotFoundError } from './errors/entity-not-found';
import { RepositoryInterface } from '../types/repository';

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

  find<T>(cond, columns = []): Promise<T[]> {
    const query = this.Model.query()
      .where(cond);

    if (columns) {
      query.columns(columns);
    }

    return query;
  }

  get<T extends Object>(id, idColumn = null, columns = []): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const useColumn = idColumn || this.idColumn;
      const query = this.Model.query()
        .findOne({
          [useColumn]: id,
        });

      if (columns) {
        query.columns(columns);
      }

      const model = await query;

      if (!model) {
        reject(entityNotFoundError(id, useColumn));
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
