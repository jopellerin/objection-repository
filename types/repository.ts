export type MutatorContextInterface = {
  trx?: {},
};

export type Identifier = string | number;

export type BuilderCallback = (builder) => void;

export interface RepositoryOptionsInterface {
  columns?: string[];
  onQuery?: BuilderCallback;
}

export interface FindOptionsInterface extends RepositoryOptionsInterface {};

export interface GetOptionsInterface extends RepositoryOptionsInterface{
  idColumn?: string;
}

export interface RepositoryInterface {
  delete(id: string | number): Promise<void>;
  find<T>(cond: {}, options: FindOptionsInterface): Promise<T[]>;
  get<T extends Object>(id: Identifier, idColumn?: string): Promise<T>;
  get<T extends Object>(id: Identifier, options?: GetOptionsInterface): Promise<T>;
  insert(data: {} | Object[], context: MutatorContextInterface): Promise<void>;
  update(data: {} | Object[], context: MutatorContextInterface): Promise<void>;
}
