export type MutatorContextInterface = {
  trx?: {},
};

export interface RepositoryInterface {
  delete(id: string | number): Promise<void>;
  find<T>(cond: {}, columns?: string[]): Promise<T[]>;
  get<T extends Object>(id: string | number, idColumn?: string | null, columns?: string[]): Promise<T>;
  insert(data: {} | Object[], context: MutatorContextInterface): Promise<void>;
  update(data: {} | Object[], context: MutatorContextInterface): Promise<void>;
}
