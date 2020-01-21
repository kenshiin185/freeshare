import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import { AuthenticationComponent} from '@loopback/authentication';
import path from 'path';
import {MySequence} from './sequence';
import { BackAuthentication } from './components/authentication';
import { UserServiceBindings } from './keys';
import { UserFreeshareService } from './services';
import { PasswordCmp } from './components/password';

export class FreesharebackApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // ajout du component d'authentification
    this.component(AuthenticationComponent);
    this.component(BackAuthentication);
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

setupBinding(){
this.bind(UserServiceBindings.USER_SERVICE).toClass(UserFreeshareService);
}

}
