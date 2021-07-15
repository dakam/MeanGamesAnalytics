import { Component } from '@angular/core';

import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'angular Test app App';
  err= false;
  success=false;
  public status=false;
 public  error=false;


  isLoggedIn() {

    return this.authentication.getAuth();

  }

  
  constructor(private usersServices:UsersService, private authentication:AuthService) { }

  ngOnInit(): void {

    this.error=false;
  
  }
public logout() {
  console.log("clicked logout")
  this.authentication.setAuth(false);
  this.isLoggedIn();
  console.log("auth=",this.isLoggedIn())
}

  public loginUser(form:any):void {

    if(!form.value.username || !form.value.password) {
      this.err = true;

    } else {

      const user = {
        username: form.value.username,
        password: form.value.password
    }

      this.usersServices.loginUser(user).then(response=> {
        this.authentication.setAuth(true);
       console.log("login sucess", response)

      }).catch(error => {

        console.log("failed", error)

        this.error= true;

      })
    }
  }

  
}
