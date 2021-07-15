import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Game} from "./games-list/games-list.component";


@Injectable({
  providedIn: 'root'
})
export class GamesDataService {
  private apiBaseUrl: string ="http://localhost:3000/api";

  constructor(private http:HttpClient) { 


  }
  public getGame(gameId:string) : Promise<Game> {

    const url: string = this.apiBaseUrl+"/games/"+gameId;
    return this.http.get(url).toPromise().then(response=>response as Game).catch(this.handleError)

  }

  
  public addGame(newGame:{}) : Promise<any> {

    const url: string = this.apiBaseUrl+"/games";
    return this.http.post(url,newGame).toPromise().then(response=>response ).catch(this.handleError)

  }

  public getGames() : Promise<Game[]> {

    const url: string = this.apiBaseUrl+"/games";
    return this.http.get(url).toPromise().then(response=>response as Game[]).catch(this.handleError)

  }

  public getAnalytics() : Promise<Game[]> {

    const url: string = this.apiBaseUrl+"/games?analytics=1";
    return this.http.get(url).toPromise().then(response=>response as Game[]).catch(this.handleError)

  }


  private handleError(error:any) : Promise<any> {
    console.log("Something went wrong", error)
    return Promise.reject(error.message || error)
  }
}
