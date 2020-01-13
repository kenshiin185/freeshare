import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthUtilisateur } from './class/authutilisateur';
import { RepAuth } from './class/rep';
import { Observable } from 'rxjs';
import { Utilisateurs } from './class/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class CommConnectionUtilisateurService {

  constructor(private http: HttpClient) { }

  login(authUtilisateur: AuthUtilisateur): Observable<RepAuth> {
    return this.http.post<RepAuth>("http://localhost:3000/api/login", JSON.stringify(authUtilisateur), {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    });
  }
  CreationUtilisateur(utilisateur: Utilisateurs): Observable<Utilisateurs> {
    return this.http.post<Utilisateurs>("http://localhost:3000/api/utilisateurs", JSON.stringify(utilisateur), {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    });
  }
}
