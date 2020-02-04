import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';
import { Utilisateurs } from './class/Utilisateur';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }
  reqDataByUserId(type: string): Observable<Utilisateurs> {
    return this.http.get<Utilisateurs>(`${environment.retBaseUrl}/api/utilisateurs/${type}?filter[fields][pseudo]=true&filter[fields][mail]=true`)
  }

  reqDataUpdate(id: string,utilisateurs:Utilisateurs): Observable<void> {
    return this.http.patch<void>(`${environment.retBaseUrl}/api/utilisateurs/${id}`, JSON.stringify(utilisateurs), {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    });
  
  }
}