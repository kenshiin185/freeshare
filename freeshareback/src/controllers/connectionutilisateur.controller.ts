import { AuthUtilisateur } from "../class/authutilisateur";
import { RepAuth } from "../class/rep";
import { post, requestBody, HttpErrors } from "@loopback/rest";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


import { v4 } from "uuid";
import { repository } from "@loopback/repository";
import { UtilisateursRepository } from "../repositories";
import { exists } from "fs";
import { UserServiceBindings } from "../keys";
import { inject } from "@loopback/core";
import { Utilisateurs } from "../models";
import { UserFreeshareService } from "../services";
import { UserService, TokenService } from "@loopback/authentication";
import { TokenNS } from "../components/authentication/types";
import { UserProfile} from "@loopback/security";

export class ConnectionutilisateurController {
  constructor(@repository(UtilisateursRepository) private repoUtilisateur: UtilisateursRepository,
  @inject(UserServiceBindings.USER_SERVICE) private userFreeshareService: UserService<Utilisateurs,AuthUtilisateur>,
  @inject(TokenNS.TOKEN_SERVICE)private tokenService : TokenService
  )
  { }

  @post("/login")
  public async login(@requestBody(AuthUtilisateur) userData: AuthUtilisateur): Promise<RepAuth> {


    const userTemp = await this.userFreeshareService.verifyCredentials(userData);

    const prf : UserProfile = this.userFreeshareService.convertToUserProfile(userTemp);
    const newToken : string = await this.tokenService.generateToken(prf);

    const rep = new RepAuth(); // instance
    rep.token = newToken;
    return rep;



  }

}
