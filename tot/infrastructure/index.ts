import { Models } from '../domain';
import { RepositoryBaseRegistry } from './RepositoryBaseRegistry';
import { GraphQLModule } from './graphql';
import { RepositoryInstanceType } from './types';

// // //Uncomment for test
// import { GraphQLClient } from './graphql/graphqlClient';
// import { AccountRepository } from './graphql/account/accountRepository';

export type { RepositoryInstanceType } from './types';

export class RepositoryModulesRegistryFactory extends Models.IRepositoryModulesRegistryFactory {
  createInstance(): RepositoryInstanceType {
    // //Uncomment for test
    // this.test();

    let registry;
    try {
      switch (this._modulesType) {
        case Models.ModulesTypes.Apollo:
          registry = RepositoryBaseRegistry.init().register(this._modulesType.toString(), GraphQLModule);
          break;
        default:
          registry = RepositoryBaseRegistry.init().register(this._modulesType.toString(), GraphQLModule);
      }
      return registry.get(this._modulesType.toString());
    } catch (e) {
      throw new Error('Invalid module setup.');
    }
  }

  // //Uncomment for test
  // async test() {
  //   const client = new GraphQLClient('https://dev.alkhbaz.totplatform.net/graphql');
  //   const _repo = new AccountRepository(client, 'alkhbaz', '0a841b7e-c732-4738-913d-9e43c054170e', 'ar-EG', 'EGP');
  //   const loginRes = await _repo.getToken('password', 'offline_access', 'admin', 'Store123');
  //   const registerPersonal = await _repo.requestRegistration(
  //     'alkhbaz',
  //     {
  //       email: 'code@example.com',
  //       username: 'code@example.com',
  //       password: 'codeExample.com@2023',
  //     },
  //     {
  //       about: 'code about',
  //       birthdate: new Date('1988-02-01'),
  //       firstName: 'CodeFN',
  //       lastName: 'CodeLN',
  //       middleName: 'CodeMD',
  //       phoneNumber: '01111111',
  //     },
  //   );
  //   //const registerCompany = await _repo.getToken('password', 'offline_access', 'admin', 'Store123');
  //   console.group('--------------------- Account Repo Responses ---------------------');
  //   //console.log('me ------> ', await _repo.getMe());
  //   console.log('registerPersonal -----> ', JSON.stringify(registerPersonal));
  //   console.log('checkEmailUniqueness ------> ', await _repo.checkEmailUniqueness('code@example.com'));
  //   // console.log('login ------> ', JSON.stringify(loginRes));
  //   console.groupEnd();
  // }
}
