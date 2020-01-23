import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin, SchemaMigrationOptions } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import { AuthenticationComponent } from '@loopback/authentication';
import path from 'path';
import { MySequence } from './sequence';
import { BackAuthentication } from './components/authentication';
import { UserServiceBindings } from './keys';
import { UserFreeshareService } from './services';
import { PasswordCmp, PasswordNS } from './components/password';
import { UtilisateursRepository } from './repositories';
import { Utilisateurs } from './models';
import { AuthorizationComponent } from '@loopback/authorization';
import { BackAutorisation } from './components/autorisation';

export class FreesharebackApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // ajout du component d'authentification
    this.component(AuthenticationComponent);
    this.component(BackAuthentication);
    this.component(AuthorizationComponent);
    this.component(BackAutorisation);
    this.component(PasswordCmp);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));
    // setup des bindings
    this.setupBinding();
    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  setupBinding() {
    this.bind(UserServiceBindings.USER_SERVICE).toClass(UserFreeshareService);
  }
  async migrateSchema(options?: SchemaMigrationOptions) {
    await super.migrateSchema(options);
    console.log("script d'installation/migration");

    let repoUser = await this.getRepository(UtilisateursRepository);
    if (!repoUser) {
      console.log("Pas de repoUser");
      return; // TODO gestion erreur migrate
    }
    let userAdmin = await repoUser.findOne({
      where: {
        pseudo: "admin"

      }

    });
    if (userAdmin) {
      console.log("Admin déjà créé");
      return;
    }
    // recherche service de hash

    const srvHash = await this.get(PasswordNS.PASSWORD_HASHER);

    if (!srvHash) {
      console.log("pas de service de hash");
      return;
    }

    userAdmin = new Utilisateurs();
    userAdmin.pseudo = "admin";
    userAdmin.mail = "admin@ad.com";
    userAdmin.password = await srvHash.hashPassword("admin1234");
    await repoUser.create(userAdmin);
  }
}
