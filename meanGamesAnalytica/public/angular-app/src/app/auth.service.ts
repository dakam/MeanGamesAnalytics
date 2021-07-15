import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = false;

  constructor() { }

  public setAuth(ath:boolean) {
    this.auth = ath;
  }

  public getAuth():boolean {
    return this.auth;
  }


}
