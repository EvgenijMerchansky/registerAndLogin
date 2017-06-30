import { Component,AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  title:string = 'Register and login application!';

  btn:any = document.getElementById('btn');

  locRel(){

    // needed for refresh data in buttons

    window.location.reload();

  }

  ngAfterViewInit() {

    // hide signOut button in login page

    const signOut = document.getElementById('signOut');

    signOut.style.display = 'none';

  }

}
