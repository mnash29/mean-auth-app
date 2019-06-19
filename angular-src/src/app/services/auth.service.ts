import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  
  constructor(private http:HttpClient) { }
  
  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('ContentType', 'application/json');
    return this.http.post('http://54.218.118.181:8080/users/register', user, {headers: headers});
  }
  
  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('ContentType', 'application/json');
    return this.http.post('http://54.218.118.181:8080/users/authenticate', user, {headers: headers});
  }
  
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
}