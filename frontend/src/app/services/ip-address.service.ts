import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpAddressService {

  url = "http://localhost:8000";

  constructor(
    private http: HttpClient
  ) { }

  loadIpAddresses(){
    return this.http.get(this.url+`/api/ip-addresses`);
  }

  httpOption = {
    headers: new HttpHeaders ({
      'Content-type': 'application/json'
    })
  }

  submit(ip_address: any): Observable<any>{
    return this.http.post(this.url+`/api/ip-address`, ip_address, this.httpOption);
  }

  find(id: Number): Observable<any>{
    return this.http.get(this.url+`/api/ip-address/`+id);
  }

  update(ip_address: any): Observable<any>{
    return this.http.put(this.url+`/api/ip-address`, ip_address);
  }
}
