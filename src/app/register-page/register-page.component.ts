import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  title:string = 'User registered!';
  subtitle:string = '<- click to Sign in section';

  ngOnInit() {

  }

}
