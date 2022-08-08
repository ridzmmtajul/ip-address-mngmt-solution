import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  loggedIn = false;

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('token') !== null;

    if(!this.loggedIn){
      this.router.navigateByUrl('/welcome');
    }
  }

}
