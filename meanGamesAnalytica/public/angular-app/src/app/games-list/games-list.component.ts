import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';

import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})



export class GamesListComponent implements OnInit {
  title:string = "mean Games";
  dataSource!: Object;
  chartConfig!: any;
  pieSource!: Object;
  pieConfig!: any;

  topExpData:Object[]=[]
  ratingGames:Object[]=[]
  analyticsVisible=false;



  games:Game[] =[];

  constructor(private gamesDataService:GamesDataService) { }

  ngOnInit(): void {

    this.getGames();
    this.getGamesAnalytics();

  

    
    
  }

  public addGame(form:any):void {

    console.log("Game Form Submitted!",form);

    const newGame = {
      title: form.value.title,
      price: form.value.price,
      year: form.value.year,
      minAge: form.value.minAge,
      rate: form.value.rate,
      minPlayers: form.value.minPlayers,
      maxPlayers: form.value.maxPlayers,
    
  };
  console.log("mygame", newGame)

  this.gamesDataService.addGame(newGame).then(response=> {

    this.err=false;
    this.success=true;
    this.error="";
    this.message="New Game added successful, Thank you"
    form.reset();


  }).catch(error=>{

    this.err=true;
    this.success=false;
    this.error="An error occured "+error;
    this.message=""

  });

  



  }

 public viewAnalytics() {

  this.analyticsVisible= true;

 }
 public hideAnalytics() {

  this.analyticsVisible= false;

 }
  public getGamesAnalytics():void {
    this.gamesDataService.getAnalytics().then(res=> {

      let allgames =res;

      allgames.sort((a, b) => {
        return b.price - a.price;
    });

    console.log("mygames=", allgames)

    let count=0;
    let high=0;
    let medium=0;
    let low =0;
    let color="";

    for(let gam of allgames) {
      count++;
      if(gam.rate >=4) {
        high++;
      } else if(gam.rate >2 && gam.rate <4) {
        medium++;
      } else {
        low++;
      }

      if(gam.price >=60) {
        color="#EA452E";

      } else if (gam.price >=30 && gam.price <60) {

        color="#2EB7EA";


      } else {
        color="#2EEA89";

      }



      if(count <=10) {
        let data = {
          "label" : gam.title,
          "value" : gam.price,
          "color": color,
        }

        this.topExpData.push(data);

      }

  
    }

    this.ratingGames = [{
      "label": "High",
      "value":high  
    },
    {
      "label": "Medium",
      "value":medium  
    },
    {
      "label": "Low",
      "value":low  
    },
  ]

  this.pieConfig = {
    width: '800',
    height: '500',
    type: 'pie2d',
    dataFormat: 'json',
};

this.pieSource = {
  "chart": {
    "caption": "Game Grouping By Rating",
    "subCaption": "How good are the games",
    "use3DLighting": "0",
    "showPercentValues": "1",
    "decimals": "1",
    "useDataPlotColorForLabels": "1",
    "theme": "fusion"
  },
  "data": this.ratingGames
};



    this.chartConfig = {
      width: '800',
      height: '500',
      type: 'column2d',
      dataFormat: 'json',
  };

  this.dataSource = {
      "chart": {
        "caption": "Top 10 Most Expensive Games",
        "subCaption": "Costly games by Ranking",
        "xAxisName": "Game Name",
        "yAxisName": "Prices",
        "numberSuffix": "$",
        "theme": "fusion",
        "exportEnabled": "1"
      },
      "data": this.topExpData
    };



    }).catch()

  }

  public getGames() : void {
    this.gamesDataService.getGames().then(foundGames =>{
      this.games=foundGames

      
    }
      );
  }

  err= false;
  success=false;
  error="";
  message="";

  isLoggedIn() {
    
    return true;

  }


}

export class Game {
  title!: string;
  price!: number;
  year!: number;
  _id!: string;
  rate!:number
}