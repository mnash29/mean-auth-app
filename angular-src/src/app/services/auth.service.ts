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
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers});
  }
  
  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('ContentType', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers});
  }

  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.set('Authorization', this.authToken);
    headers.set('ContentType', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers});
  }
  
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}