import { RepositoryInstanceType } from './types';

/// TODO: Should ensure that returned and registered module is type safe
export class RepositoryBaseRegistry<T extends RepositoryInstanceType | {}> {
  private constructor(private registry: T) {}
  register<K extends string, S>(key: K, service: S): RepositoryBaseRegistry<Record<K, S> & T> {
    // add service to registry and return the same object with a narrowed type
    (this.registry as any)[key] = service;
    return this as any as RepositoryBaseRegistry<Record<K, S> & T>;
  }
  get<K extends keyof T>(key: K): T[K] {
    if (!(key in this.registry)) {
      throw new Error('Invalid type' + key.toString());
    }
    return this.registry[key];
  }
  static init<M extends RepositoryInstanceType>(): RepositoryBaseRegistry<M> {
    return new RepositoryBaseRegistry<M>({} as M);
  }
}
