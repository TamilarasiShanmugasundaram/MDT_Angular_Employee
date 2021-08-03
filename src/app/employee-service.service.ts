import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }
  
  /**
   * To get all employee data
   * 
   * @param page contains page number
   * return all employees
   */ 
  getEmployees(page: number): Observable<any> {
    return this.http.get(Constants.LOCALHOST + 'employee?page=' + page + '&limit=' + 10);
  }
   
  /**
   * To get particular employee data
   * 
   * @param id contains employee id
   * return particular employee
   */ 
  getEmployeeById(id: any): Observable<any> {
    return this.http.get(Constants.LOCALHOST + 'employee/' + id);
  }

  /**
   * To add employee data
   * 
   * @param contains name, address, phonenumber, created_at, updated_at, is_deleted 
   */
  addEmployee(name: any, address: any, phone_number: any) {
    this.http.post(Constants.LOCALHOST + 'employee', {name: name, address: address, 
      phone_number: phone_number}).subscribe((response: any) => {
      if(response.error) {
        this.toastr.error(response.error, Constants.ERROR);
      } else {
        this.toastr.success(response.message, Constants.SUCCESS);
        this.router.navigate(['/display']);
      }
    });
  }

  /**
   * To update employee
   * 
   * @param contains id, name, address, phonenumber, created_at, updated_at, is_deleted  
   */ 
  updateEmployee(id: any, name: any, address: any, phone_number: any) {
    this.http.put(Constants.LOCALHOST + 'employee/' + id, {id: id, name: name, address: address, 
      phone_number: phone_number, is_deleted: false}).subscribe((response: any) => {
      if(response.error) {
        this.toastr.error(response.error, Constants.ERROR);
      } else {
        console.log(response.message)
        this.toastr.success(response.message, Constants.SUCCESS);
        this.router.navigate(['/display']);
      }
    });
  }

  /**
   * To add employee data
   * 
   * @param contains id, name
   */
  deleteEmployee(id: any, name: any) {
    this.http.post(Constants.LOCALHOST + 'employee/' + id, {id: id}).subscribe((response: any) => {
      if(response.error) {
        this.toastr.error(response.error, Constants.ERROR);
      } else {
        this.toastr.success(name + response.message, Constants.SUCCESS);
      }
    });
  }
}