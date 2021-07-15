import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiBaseUrl: string ="http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  public addUser(newUser:{}) : Promise<any> {

    const url: string = this.apiBaseUrl+"/users/register";
    return this.http.post(url,newUser).toPromise().then(response=>response ).catch(this.handleError)

  }

  public loginUser(user:{}):Promise<any>  {

    const url: string = this.apiBaseUrl+"/users/login";
    return this.http.post(url, user).toPromise().then(response =>response).catch(this.handleError)
}

  private handleError(error:any) : Promise<any> {
    console.log("Something went wrong", error)
    return Promise.reject(error.message || error)
  }
}
