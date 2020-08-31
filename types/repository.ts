export type MutatorContextInterface = {
  trx?: {},
};

export interface RepositoryInterface {
  delete(id: string | number): Promise<void>;
  find(cond: {}, columns?: string[]): Promise<Object[]>;
  get(id: string | number, column?: string): Promise<{}>;
  insert(data: {} | Object[], context: MutatorContextInterface): Promise<void>;
  update(data: {} | Object[], context: MutatorContextInterface): Promise<void>;
}
