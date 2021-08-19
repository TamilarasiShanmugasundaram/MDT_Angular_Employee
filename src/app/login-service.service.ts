import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  is_authenticate = false;
  token: string = '';
  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }
  
  /**
   * To log in user 
   * 
   * @param contains name, address, phonenumber, created_at, updated_at, is_deleted 
   */
  logInUser(username: any, password: any) {
    this.http.post(Constants.LOCALHOST + 'login', {username: username, password: password})
    .subscribe((response: any) => {
      if(response.token) {
        this.is_authenticate = true;
        this.token = response.token;
        localStorage.setItem("token", this.token);
        this.router.navigate(['/add']);
      } else {
        this.toastr.error(response.message, Constants.ERROR);
      }
    });
  }
  logout() {
    alert('logout');
    this.router.navigate(['/login']);
  }
}
