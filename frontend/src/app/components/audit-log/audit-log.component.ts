import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditLogService } from 'src/app/services/audit-log.service';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss']
})
export class AuditLogComponent implements OnInit {

  audit_logs: any;
  loggedIn = false;

  constructor(
    private auditLogService: AuditLogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadAuditLog();
    this.loggedIn = localStorage.getItem('token') !== null;

    if(!this.loggedIn){
      this.router.navigateByUrl('/welcome');
    }
  }

  loadAuditLog(){
    this.auditLogService.loadAuditLog().subscribe(
      (data) => {
        this.audit_logs = data;
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
