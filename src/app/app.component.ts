import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDtkzrfxMcWeVmaq8ltEFil9hW2DohKTig',
      authDomain: 'ng-recipe-book-27d4a.firebaseapp.com'
    });
  }

}
