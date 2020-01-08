import { AuthUtilisateur } from "../class/authutilisateur";
import { RepAuth } from "../class/rep";
import { post, requestBody, HttpErrors } from "@loopback/rest";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


import { v4 } from "uuid";
import { repository } from "@loopback/repository";
import { UtilisateursRepository } from "../repositories";
import { exists } from "fs";


export class ConnectionutilisateurController {
  constructor(@repository(UtilisateursRepository) private repoUtilisateur: UtilisateursRepository) { }

  @post("/login")
  public async login(@requestBody(AuthUtilisateur) userData: AuthUtilisateur): Promise<RepAuth> {
    console.log(userData);
    let userRead = await this.repoUtilisateur.findOne({
      where: {
        pseudo: userData.identifiant
      }
    });
console.log(userRead);
    if (userRead == null) { // test du resultat
      throw new HttpErrors.Unauthorized("Erreur user/password");
    }
    // test du mdp
    if (userRead.password !== userData.password) {
      throw new HttpErrors.Unauthorized("Erreur user/password");
    }


    const tokeWrk = v4();
    return {
      token: tokeWrk
    };




  }

}
