import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'IP Address Management System';

  loggedIn = false;

  constructor(
    private router: Router
  ){}

  ngOnInit(){
    this.loggedIn = localStorage.getItem('token') !== null;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');

    this.loggedIn = false; 
    this.router.navigateByUrl('login');
  }
}
