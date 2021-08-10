import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  /**
   * To get all employee data
   * 
   * @param page contains page number
   * return all employees
   */ 
  getUsers(): Observable<any> {
    return this.http.get(Constants.LOCALHOST + 'user');
  }
     
  /**
   * To get particular employee data
   * 
   * @param id contains employee id
   * return particular employee
   */ 
  getUserById(id: any): Observable<any> {
    return this.http.get(Constants.LOCALHOST + 'user/' + id);
  }
  
  /**
   * To add user 
   * 
   * @param contains first_name, last_name, username, address, phonenumber, email 
   */
  addUser(first_name: any, last_name: any, username: any, 
    address: any, phone_number: any, email: any, password: any) {
    this.http.post(Constants.LOCALHOST + 'user', {first_name: first_name, last_name: last_name,
    username: username, address: address, phone_number: phone_number, email: email, password: password}) 
    .subscribe((response: any) => {
      if(response.error) {
        this.toastr.error(response.error, Constants.ERROR);
      } else {
        this.toastr.success(response.message, Constants.SUCCESS);
        this.router.navigate(['/add']);
      }
    }, err => {  
      if(409 == err.status) {
        this.toastr.error(err.error.message, Constants.ERROR);
      }
    });
   }
}
