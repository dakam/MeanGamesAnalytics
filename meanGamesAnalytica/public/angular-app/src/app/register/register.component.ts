import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error="";
  message="";
  err=false;
  success=false;

  constructor(private usersServices:UsersService) { }

  ngOnInit(): void {
  }

  public registerUser(form:any):void {
    console.log("my form", form)

    if(!form.value.username || !form.value.password || !form.value.passwordRepeat || !form.value.name) {
      this.error = "Please make sure you fill all the fields";
      this.err=true;
      this.success=false;
  } else {
      if(form.value.password !== form.value.passwordRepeat) {
          this.error = "Please make sure the passwords match";
          this.err=true;
          this.success=false;
      } else {


        const newUser = {
          username: form.value.username,
          password: form.value.password,
          name: form.value.name
      }

      console.log("my new user is ", newUser);

      this.usersServices.addUser(newUser).then(response=> {


        this.err=false;
        this.success=true;
        this.message="User registration was successful"

        form.reset();

      }).catch(error=> {

        this.err=true;
        this.success=false;
        this.error="An error occured while trying to register, please try again later"

      });



      }



  }
}






}
