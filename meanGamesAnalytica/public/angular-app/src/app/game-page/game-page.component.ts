import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import {Game} from "../games-list/games-list.component";
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {


  game:Game = {} as Game;
  rating = 0;

  constructor(private gamesDataService:GamesDataService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const gameId: string = this.route.snapshot.params.gameId
    this.getGame(gameId)
    this.rating= this.game.rate;
  }

  private getGame(gameId:string):void {

    this.gamesDataService.getGame(gameId)
    .then(response =>this.receivedGame(response))
    .catch(this.handleError)
  }

  private receivedGame(game:Game) {

    this.game= game;
    this.rating= game.rate;
  }

  private handleError(error:any) {
    console.log("error")
  }

}
