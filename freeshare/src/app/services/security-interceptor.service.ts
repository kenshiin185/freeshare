import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs"
import { ConnectionComponent } from '../connection/connection.component';
import { FrmCurrentServiceService } from '../frm-current-service.service';
@Injectable()
export class SecurityInterceptorService implements HttpInterceptor {


  constructor(public currentUser: FrmCurrentServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interception');
    if (this.currentUser.token != "") {

      let headers = req.headers;
      headers = headers.append('authorization', `Bearer ${this.currentUser.token}`);
      const authreq = req.clone({ headers: headers });
      return next.handle(authreq);

    }

    return next.handle(req);
  }

}
