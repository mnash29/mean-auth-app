import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Component properties
  username: String;
  password: String;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }
  
  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    
    this.authService.authenticateUser(user).subscribe(data => {
      if((data as any).success) {
        this.authService.storeUserData((data as any).token, (data as any).user);
        this.flashMessage.show((data as any).msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show((data as any).msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['/login']);
      }
    });
  }
}