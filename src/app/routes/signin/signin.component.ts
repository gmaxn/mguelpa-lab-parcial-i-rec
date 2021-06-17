import { Component, Input, OnInit } from '@angular/core';
import { UserCredentials } from 'src/app/models/user-credentials';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @Input() prompt:any = {
    show: false
  };
  public message:string = '';

  constructor(
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    
  }

  onPrompt(error:any) {
    this.prompt.show = true;
    this.prompt.message = error;
    this.prompt.buttons = ['Ok'];
  }

  onResponse(response:any) {
    this.prompt = response;
  }

  onSignin(credentials:UserCredentials) {
    this.auth.signIn(credentials);
  }

  onSignup(credentials:any) {
    this.auth.signUp(credentials);    
  }
}