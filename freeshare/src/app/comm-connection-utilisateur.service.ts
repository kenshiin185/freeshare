import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthUtilisateur } from './class/authutilisateur';
import { RepAuth } from './class/rep';
import { Observable, from } from 'rxjs';
import { Utilisateurs } from './class/Utilisateur';
import { Partage } from './class/partage';
import { environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommConnectionUtilisateurService {

  constructor(private http: HttpClient) { }

  login(authUtilisateur: AuthUtilisateur): Observable<RepAuth> {
    return this.http.post<RepAuth>(`${environment.retBaseUrl}/api/login`, JSON.stringify(authUtilisateur), {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    });
  }
  CreationUtilisateur(utilisateur: Utilisateurs): Observable<Utilisateurs> {
    return this.http.post<Utilisateurs>(`${environment.retBaseUrl}/api/utilisateurs`, JSON.stringify(utilisateur), {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    });
  }
  Partager(partage: Partage): Observable<Partage>{
    return this.http.post<Partage>(`${environment.retBaseUrl}/api/partage`, JSON.stringify(partage))
  }
}
