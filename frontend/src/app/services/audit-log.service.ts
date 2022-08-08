import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {

  url: String = "http://localhost:8000" ;

  constructor(
    private http: HttpClient
  ) { }

  loadAuditLog(){
    return this.http.get(this.url+`/api/audit-logs`);
  }

  submit(log: any): Observable<any>{
    return this.http.post(this.url+`/api/audit-logs`, log);
  }
}
