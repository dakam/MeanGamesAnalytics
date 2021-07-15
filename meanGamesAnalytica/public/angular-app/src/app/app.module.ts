import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { FusionChartsModule } from 'angular-fusioncharts';
// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load fusion theme
import * as Fusion from 'fusioncharts/themes/fusioncharts.theme.fusion';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesDataService } from './games-data.service';
import { UsersService } from './users.service';
import { GamePageComponent } from './game-page/game-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { OrderPipe } from './order.pipe';
import { RatingPipe } from './rating.pipe';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, Fusion)

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GamesListComponent,
    GamePageComponent,
    ErrorPageComponent,
    OrderPipe,
    RatingPipe,
    RegisterComponent,
    ProfileComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FusionChartsModule,
    FormsModule,
    RouterModule.forRoot([ {
      path: "", 
      component:WelcomeComponent
    },
    {
      path: "games", 
      component:GamesListComponent
    },
    {
      path: "game/:gameId", 
      component:GamePageComponent
    },
    {
      path: "register", 
      component:RegisterComponent
    },
    {
      path: "profile", 
      component:ProfileComponent
    },
    {
      path: "**", 
      component:ErrorPageComponent
    }
  
  ]),
    NgbModule
  ],
  providers: [
    GamesDataService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
