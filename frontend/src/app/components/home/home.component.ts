import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.current_user(localStorage.getItem('token')).subscribe(
      (res) => {
        this.user = res;
        localStorage.setItem('user_id', this.user.id);   
      },
      (err) => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');

        console.log(err);
      })
    }
}