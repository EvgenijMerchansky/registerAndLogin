import { Component, AfterViewInit,ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Directive , Input , Output, EventEmitter } from '@angular/core';
import { GoogleMapsService } from 'google-maps-angular2';
import { Popup } from 'ng2-opd-popup';

const globalData:any = [];

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  inputs: ['model']
})
export class LoginPageComponent implements AfterViewInit {

  @ViewChild('mapElement') mapElement;
  @ViewChild('inputElement') inputElement;
  @ViewChild('itemval') itemval;
  @ViewChild('popup2') popup2:any = Popup;

  keyArr:any = [];
  totalitem:any;
  currentitem:any;
  markerTitle:any;
  markerArray = [];
  arrayForRender:any = [];
  changeUserData:string;
  testArr2 = this.showUser();

  // * user list array

  mappedArr = this.testArr2.map((elem, index) => {

    const testingObj = {
      name: elem
    }

    return testingObj;
  })

  private map: any;

  // * my constructor for map

  constructor(private gapi: GoogleMapsService,private popup:Popup) {

  }

  YourConfirmEvent(e){

    // * "confirm" button in popup

      let key = this.itemval.nativeElement.value;

      const currentStorage = localStorage.getItem(this.currentitem);

      localStorage.removeItem(this.totalitem);

      localStorage.setItem(key, currentStorage);

      this.popup2.mainStyle.display = 'none';

      window.location.reload();

    }



  ClickButton(e){

    // * "change user" button in list

      let item = e.target.parentNode.childNodes[0].data,
          some1 = item.substr(0, item.length - 1);

      this.changeUserData = some1;



      for (let key in localStorage){

         this.keyArr.push(key);

      }



      const localChange = this.keyArr.filter((elem, index) => {

        if(elem === some1){

          return elem === some1;

        }

      });



      const totalChange = localChange[0];

      this.currentitem = some1;

      this.totalitem = totalChange;

      this.popup.options = {

        header: "Change users",
        color: "#00abba", // red, blue....
        widthProsentage: 30, // The with of the popou measured by browser width
        animationDuration: 1, // in seconds, 0 = no animation
        showButtons: true, // You can hide this in case you want to use custom buttons
        confirmBtnContent: "OK", // The text on your confirm button
        cancleBtnContent: "Cancel", // the text on your cancel button
        confirmBtnClass: "btn btn-default", // your class for styling the confirm button
        cancleBtnClass: "btn btn-default", // you class for styling the cancel button
        animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'

      };

      this.popup.show(this.popup2.options);

    }



  ngAfterViewInit(): void {



    // * get value for list

    document.addEventListener('keydown', (e) => {

      const input:any = document.querySelector('.input');

      e.key == 'Enter' ? this.arrayForRender.push(input.value) : this.arrayForRender;

    });



    // * header buttons

    const signIn = document.getElementById('signIn'),
          signOut = document.getElementById('signOut'),
          register = document.getElementById('register');

    signIn.style.display = 'none';

    signOut.style.display = 'block';

    register.style.display = 'none';



    // * GMApi , create map and markers

    this.gapi.init.then((maps: any) => {

      const loc = new maps.LatLng(49.994384, 36.236568), // default
            input = this.inputElement.nativeElement,
            options = {
              componentRestrictions: {country: ['uk','us','rus','ukr','au']} // countries
            };



      this.map = new maps.Map(this.mapElement.nativeElement, {
        zoom: 13,
        center: loc,
        scrollwheel: true,
        panControl: true,
        visible: true,
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
        scaleControl: true,
        zoomControlOptions: {
          style: maps.ZoomControlStyle.LARGE,
          position: maps.ControlPosition.RIGHT_BOTTOM
        }
      });



      const autocomplete = new maps.places.Autocomplete(input, options);



      autocomplete.addListener('place_changed', (e) => {

        const place = autocomplete.getPlace(),
              location = place.geometry.location,
              laten = place.geometry.location.lat(),
              lngF = place.geometry.location.lng(),
              deleteBtns:any = document.querySelectorAll('.del-btn'),

              indiv = {
                laten: new maps.LatLng(laten, lngF),
                name: this.inputElement.nativeElement.value,
              };

        globalData.push(indiv);




        let bounds = new maps.LatLngBounds();

        for(let i = 0; i < globalData.length; i++){

          const marker = new maps.Marker({
            position: globalData[i].laten,
            map: this.map,
            title: this.inputElement.nativeElement.value,
            visible: true,
            draggable: true,
            id: (() => {
              return Math.random().toString(36).substr(2, 9);
            })()
          });




          for(let i = 0; i < deleteBtns.length; i++){

            deleteBtns[i].addEventListener('click',(e) => {

              deleteBtns[i].id = marker.id;

              deleteBtns[i].id == marker.id ? marker.setMap(null) : marker

            });




            this.markerTitle = marker.title;

            bounds.extend(globalData[i].laten);

          }



          this.markerArray.push(this.markerTitle);

          this.map.fitBounds(bounds);

        }

      });

    });
  // * GMApi END
  }


  admin(){

    // * create general user "admin1"

    const adminBool = localStorage.getItem('adminGeneral');

    return adminBool;

  }



  showUser() {

    // * get values with store

    const testArr = [];

    const store = localStorage;

    for (let i in store){

      testArr.push(i);

    }

    return testArr;
  }



  delFunc(e) {

    // * delete user function

    const elemTargetting = e.target.parentNode.childNodes[0].value;

    localStorage.removeItem(elemTargetting);

    window.location.reload();

  }



  delFuncLoc(e){

    // * delete location function

    const listvalue = e.target.parentNode.innerText;
    let processedValue = listvalue.substr(0, listvalue.length - 2);

    for(let i = 0; i < this.arrayForRender.length; i++){

      processedValue == this.arrayForRender[i] ? this.arrayForRender.splice(i,1) : this.arrayForRender;

    }

    for(let i = 0; i < globalData.length; i++){

      processedValue == globalData[i].name ? globalData.splice(i,1) : globalData;

    }

  }

}
