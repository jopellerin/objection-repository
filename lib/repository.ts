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

  find(cond, columns = []): Promise<Object[]> {
    const query = this.Model.query()
      .where(cond);

    if (columns) {
      query.columns(columns);
    }

    return query;
  }

  get(id, column = null) {
    return new Promise(async (resolve, reject) => {
      let model;
      const useColumn = column || this.idColumn;

      model = await this.Model.query()
        .findOne({
          [useColumn]: id,
        });

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

  update(data, { trx = null }): Promise<void> {
    return this.Model.query(trx)
      .update(data);
  }
}

export default Repository;
