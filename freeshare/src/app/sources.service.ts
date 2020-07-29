import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Sources } from './class/Sources';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SourcesService {
  
  

  constructor(private http: HttpClient) { }

  reqDataByOwner(owner: string): Observable<Sources[]> {
    return this.http.get<Sources[]>(`${environment.retBaseUrl}/api/sources-bdds?filter[where][owner]=${owner}`)
  }
  reqDataByType(type: string): Observable<Sources[]> {
    return this.http.get<Sources[]>(`${environment.retBaseUrl}/api/sources-bdds?filter[where][typemime]=${type}`)
  }
  reqDataByTypeLike(type: string): Observable<Sources[]> {
    return this.http.get<Sources[]>(`${environment.retBaseUrl}/api/sources-bdds?filter[where][typemime][like]=${type}`)
  }
  reqDataByLastPost(type: string): Observable<Sources[]> {
    return this.http.get<Sources[]>(`${environment.retBaseUrl}/api/sources-bdds?
    filter[where][typemime][like]=image&filter[order]=date%20DESC&filter[limit]=3`)
  }
  reqDataByPseudo(type:string): Observable<Sources[]>{
    return this.http.get<Sources[]>(`${environment.retBaseUrl}/api/sources-bdds?filter[where][pseudo]=${type}`)
  }
  reqUpdateSrc(source: Sources): Observable<void> {
    return this.http.patch<void>(`${environment.retBaseUrl}/api/sources-bdds/${source._id}`,
      JSON.stringify(source),
      {
        headers: new HttpHeaders().set("Content-Type", "application/json")
      }
    )
  }


}

