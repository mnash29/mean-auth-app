import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  
  constructor(private http:HttpClient) { }
  
  registerUser(user) {
    const headers = new HttpHeaders()
      .set('ContentType', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers});
  }
  
  authenticateUser(user) {
    const headers = new HttpHeaders()
      .set('ContentType', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers});
  }

  getProfile() {
    this.loadToken();
    const headers = new HttpHeaders()
      .set('ContentType', 'application/json')
      .set('Authorization', this.authToken);
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

  loggedIn() {
    const helper = new JwtHelperService();
    if(this.authToken) {
      // If token is not expired then return true
      return !helper.isTokenExpired(this.authToken);
    } else {
      return false;
    }
    
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}