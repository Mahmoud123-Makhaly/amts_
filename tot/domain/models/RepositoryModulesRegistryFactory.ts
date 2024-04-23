import { ModulesTypes } from './ModulesTypes';

export abstract class IRepositoryModulesRegistryFactory {
  protected readonly _modulesType: ModulesTypes;
  constructor(type: ModulesTypes) {
    this._modulesType = type;
  }
  abstract createInstance(): any;
}
