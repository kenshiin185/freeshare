import { bind, /* inject, */ BindingScope, inject } from '@loopback/core';
import { UserService } from '@loopback/authentication';
import { Utilisateurs } from '../models';
import { AuthUtilisateur } from '../class/authutilisateur';
import { repository } from '@loopback/repository';
import { UtilisateursRepository } from '../repositories';
import { HttpErrors } from '@loopback/rest';
import { v4 } from 'uuid';
import { UserProfile, securityId } from "@loopback/security";

import { PasswordNS } from '../components/password';
import { PasswordHasher } from '../components/password/secu-tools';

@bind({ scope: BindingScope.TRANSIENT })
export class UserFreeshareService implements UserService<Utilisateurs, AuthUtilisateur>{


  async verifyCredentials(credentials: AuthUtilisateur): Promise<Utilisateurs> {

    console.log(credentials);
    let userRead = await this.repoUtilisateur.findOne({
      where: {
        pseudo: credentials.identifiant
      }

    });

    console.log(userRead);
    if (userRead == null) { // test du resultat
      throw new HttpErrors.Unauthorized("Erreur user/password 1");

    }

    const isOk = await this.hasher.comparePassword(<string>credentials.password, userRead.password);

    // test du mdp
    console.log(isOk);
    if (!isOk) {
      throw new HttpErrors.Unauthorized("Erreur user/password 2");

    }
   
    return userRead;
  }
  /**
   * 
   * @param user 
   */

  convertToUserProfile(user: Utilisateurs): UserProfile {
    const usrProfil: UserProfile = {
      [securityId]: `${user._id}`,
      name: user.pseudo,
      email: user.email,
      id: user._id
    }
    return usrProfil;

  }

  constructor(@repository(UtilisateursRepository) private repoUtilisateur: UtilisateursRepository,
    @inject(PasswordNS.PASSWORD_HASHER) private hasher: PasswordHasher) { }

  /*
   * Add service methods here
   */
}
