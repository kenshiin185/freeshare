import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Utilisateurs } from '../models';
import { UtilisateursRepository } from '../repositories';
import { UserServiceBindings } from '../keys';
import { inject } from '@loopback/core';
import { UserFreeshareService } from '../services';
import { AuthUtilisateur } from '../class/authutilisateur';
import { UserService } from '@loopback/authentication';
import { PasswordNS } from '../components/password';

export class UtilisateurController {
  constructor(
    @repository(UtilisateursRepository)
    public utilisateursRepository: UtilisateursRepository,
    @inject(UserServiceBindings.USER_SERVICE) private UserFreeshareService: UserService<Utilisateurs, AuthUtilisateur>,
    @inject(PasswordNS.PASSWORD_HASHER) private hasher: PasswordNS.IPasswordHasher
  ) { }

  @post('/utilisateurs', {
    responses: {
      '200': {
        description: 'Utilisateurs model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Utilisateurs) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Utilisateurs, {
            title: 'NewUtilisateurs',

          }),
        },
      },
    })
    utilisateurs: Utilisateurs,
  ): Promise<Utilisateurs> {
    utilisateurs.password = await this.hasher.hashPassword(utilisateurs.password); // hash
    let retNewUser = await this.utilisateursRepository.create(utilisateurs); // save
    retNewUser.password = ""; // delete password
    return retNewUser;
  }

  @get('/utilisateurs/count', {
    responses: {
      '200': {
        description: 'Utilisateurs model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Utilisateurs)) where?: Where<Utilisateurs>,
  ): Promise<Count> {
    return this.utilisateursRepository.count(where);
  }

  @get('/utilisateurs', {
    responses: {
      '200': {
        description: 'Array of Utilisateurs model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Utilisateurs, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Utilisateurs)) filter?: Filter<Utilisateurs>,
  ): Promise<Utilisateurs[]> {
    return this.utilisateursRepository.find(filter);
  }

  @patch('/utilisateurs', {
    responses: {
      '200': {
        description: 'Utilisateurs PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Utilisateurs, { partial: true }),
        },
      },
    })
    utilisateurs: Utilisateurs,
    @param.query.object('where', getWhereSchemaFor(Utilisateurs)) where?: Where<Utilisateurs>,
  ): Promise<Count> {
    return this.utilisateursRepository.updateAll(utilisateurs, where);
  }

  @get('/utilisateurs/{id}', {
    responses: {
      '200': {
        description: 'Utilisateurs model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Utilisateurs, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Utilisateurs)) filter?: Filter<Utilisateurs>
  ): Promise<Utilisateurs> {
    return this.utilisateursRepository.findById(id, filter);
  }

  @patch('/utilisateurs/{id}', {
    responses: {
      '204': {
        description: 'Utilisateurs PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Utilisateurs, { partial: true }),
        },
      },
    })
    utilisateurs: Utilisateurs,
  ): Promise<void> {
    await this.utilisateursRepository.updateById(id, utilisateurs);
  }

  @put('/utilisateurs/{id}', {
    responses: {
      '204': {
        description: 'Utilisateurs PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() utilisateurs: Utilisateurs,
  ): Promise<void> {
    await this.utilisateursRepository.replaceById(id, utilisateurs);
  }

  @del('/utilisateurs/{id}', {
    responses: {
      '204': {
        description: 'Utilisateurs DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.utilisateursRepository.deleteById(id);
  }
}
