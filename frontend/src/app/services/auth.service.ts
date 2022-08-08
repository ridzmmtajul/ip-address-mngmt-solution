import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = "http://localhost:8000";
  constructor( private http: HttpClient ) { }

  login(user: any): Observable<any>{    
    return this.http.post(this.url+`/oauth/token`, user);
  }

  current_user(token: any): Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }

    return this.http.get(this.url+`/api/user`, httpOption);
  }

  register(user: any): Observable<any>{
    return this.http.post(this.url+`/api/users`, user);
  }
}
