import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditLogService } from 'src/app/services/audit-log.service';
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
    private auditLogService: AuditLogService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.current_user(localStorage.getItem('token')).subscribe(
      (res) => {
        this.user = res;
        localStorage.setItem('user_id', this.user.id);    

        this.logActivity('User logged in')
      },
      (err) => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');

        console.log(err);
      })
  }

  logActivity(action: String){
    if(localStorage.getItem('user_id')){
      const log = {
        'user_id': localStorage.getItem('user_id'),
        'action': action
      }
  
      this.auditLogService.submit(log).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      )
    }else{
      this.router.navigateByUrl('/login');
    }
  }

}