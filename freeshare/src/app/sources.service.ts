import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sources } from './class/Sources';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SourcesService {

  constructor(private http: HttpClient) { }

  reqDataByOwner(owner: string): Observable<Sources[]> {
    return this.http.get<Sources[]>(`http://localhost:3000/api/sources-bdds?filter[where][owner]=${owner}`)
  }
  reqDataByType(type: string): Observable<Sources[]> {
    return this.http.get<Sources[]>(`http://localhost:3000/api/sources-bdds?filter[where][typemime]=${type}`)
  }
  reqDataByTypeLike(type: string): Observable<Sources[]> {
    return this.http.get<Sources[]>(`http://localhost:3000/api/sources-bdds?filter[where][typemime][like]=${type}`)
  }

  reqDataBytypes(type: string): Observable<Sources[]> {
    return this.http.get<Sources[]>(`http://localhost:3000/api/sources-bdds?filter[where][typemime]=${type['video/mpeg']} ||
    ${type['video/mp4']} || ${type['video/quicktime']} || ${type['video/x-ms-wmv']} || ${type['video/x-msvideo']}
    || ${type['video/x-flv']} || ${type['video/web']}`)
  }

  reqUpdateSrc(source: Sources): Observable<void> {
    return this.http.patch<void>(`http://localhost:3000/api/sources-bdds/${source._id}`,
      JSON.stringify(source),
      {
        headers: new HttpHeaders().set("Content-Type", "application/json")
      }
    )
  }


}

