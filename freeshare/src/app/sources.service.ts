import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sources } from './class/Sources';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SourcesService {

  constructor(private http: HttpClient) { }
  
  reqDataByOwner(owner: string): Observable<Sources[]> {
    return this.http.get<Sources[]>(`http://localhost:3000/api/sources-bdds?filter[where][owner]=${owner}`)
  }
  reqDataByType(type: string): Observable<Sources[]>{
    return this.http.get<Sources[]>(`http://localhost:3000/api/sources-bdds?filter[where][typemime]=${type}`)
  }
  reqDataBytypes(type: string): Observable<Sources[]>{
    return this.http.get<Sources[]>(`http://localhost:3000/api/sources-bdds?filter[where][typemime]=${type['video/mpeg']} ||
    ${type['video/mp4']} || ${type['video/quicktime']} || ${type['video/x-ms-wmv']} || ${type['video/x-msvideo']}
    || ${type['video/x-flv']} || ${type['video/web']}`)
  }
  

}

