import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './app.regstser.html',
  styleUrls: ['./app.regstser.scss']
})
export class Register {
  title = 'register page';

  regFields: Object = {
    newLogin: '',
    newPass: '',
    rePass: ''
  };

  log = function(e){

    // * set new user values

    localStorage.setItem(this.regFields.newLogin, this.regFields.newPass);

  }

}
