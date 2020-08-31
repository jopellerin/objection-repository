export function EntityNotFoundError({ message, stack }: Error): void {
  this.code = 'ER_ENTITY_NOT_FOUND';
  this.name = 'EntityNotFoundError';
  this.message = (message || '');
  this.stack = stack;
}
EntityNotFoundError.prototype = Error.prototype;

export function entityNotFoundError(id, column): Error {
  const error = new Error(`Entity with "${column}" of "${id}" was not found`);
  return new EntityNotFoundError(error);
}
