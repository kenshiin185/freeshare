import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthUtilisateur } from './class/authutilisateur';
import { RepAuth } from './class/rep';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommConnectionUtilisateurService {

  constructor(private http: HttpClient) { }

  login(authUtilisateur: AuthUtilisateur) : Observable<RepAuth>{
   return this.http.post<RepAuth>("http://localhost:3000/login", JSON.stringify(authUtilisateur), {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    });
  }
}
