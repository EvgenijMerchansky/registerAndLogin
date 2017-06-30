import { Component, OnInit } from '@angular/core';
import { LoginPageComponent } from '../login-page/login-page.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title:string = 'Login page!';
  model:Object = {
    login: '',
    password: '',
  };

  show = function(e,login,password){

    // * user login and create admin function

    if(this.model.login == 'admin1' && this.model.password == 'admin1111'){

      let adminValid:any = true;

      localStorage.setItem('adminGeneral', adminValid);

    }else{

      this.adminValid = false;

      localStorage.setItem('adminGeneral', this.adminValid);

    }



    const names = [];

    for (let i in localStorage){

        const key = i,
              value = localStorage[i],
              total = {
                key: key,
                value: value
              }

        names.push(total);

    }



    const keys = names.map((elem, index) => {

      let boolLog:boolean = false;

      this.model.login == elem['key'] ? boolLog = true : boolLog = false;

      return boolLog

    });



    const values = names.map((elem, index) => {

      let boolPass:boolean = false;

      this.model.password == elem['value'] ? boolPass = true : boolPass = false;

        return boolPass

    })



    const logSome = keys.some(x => x == true),
          passSome = values.some(x => x == true); // true

    if(logSome && passSome == true){

      const totalTrue = true;

      return totalTrue;

    }



  }



  ngOnInit() {

    const signOut = document.getElementById('signOut');

    signOut.style.display = 'none';

  };

}
