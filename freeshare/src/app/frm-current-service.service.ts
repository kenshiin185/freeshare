import { Injectable } from '@angular/core';
//import { get } from 'http';


@Injectable({
  providedIn: 'root'
})
export class FrmCurrentServiceService {
  private _token: string = "";

  public get token(): string {

    if (!this._token) {
      if (window.sessionStorage.getItem("savetoken")) {
        this._token = window.sessionStorage.getItem("savetoken");
        return this._token;
      }

    }
    return this._token;
  }



  public set token(v: string) {
    if (!this._token) {
      window.sessionStorage.setItem("savetoken", v);
      this._token = v;



    }
  }

  constructor() { }
}
