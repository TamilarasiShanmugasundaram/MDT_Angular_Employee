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
        this.token = response.token;
        localStorage.setItem("token", this.token);
        this.router.navigate(['/add']);
      } else {
        this.toastr.error(response.error, Constants.ERROR);
      }
    }, err => {  
      if(401 == err.status) {
        this.toastr.error(err.error.message, Constants.ERROR);
      }
    });
  }
  logout() {
    alert('logout');
    this.router.navigate(['/login']);
  }
}
