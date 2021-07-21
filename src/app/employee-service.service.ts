import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }
  
  /**
   * To get all employee data
   * 
   * @param page contains page number
   */ 
  getEmployee(page: number): Observable<any> {
    return this.http.get('http://localhost:3330/employee?page=' + page + '&limit=' + 10);
  }
   
  /**
   * To get particular employee data
   * 
   * @param id contains employee id
   */ 
  getEmployeeById(id: any): Observable<any> {
    return this.http.get('http://localhost:3330/employee/' + id);
  }

  /**
   * To add employee data
   * 
   * @param contains name, address, phonenumber, created_at, updated_at, is_deleted 
   */
  addEmployee(name: any, address: any, phonenumber: any, is_deleted: any) {
    this.http.post('http://localhost:3330/employee', {name: name, address: address, 
      phonenumber: phonenumber, is_deleted: is_deleted}).subscribe((response: any) => {
      if(response.error) {
        this.toastr.error(response.error, 'Error');
      } else {
        console.log(response.message)
        this.toastr.success(response.message, 'Success');
        this.router.navigate(['/display']);
      }
    });
  }

  /**
   * To update employee
   * 
   * @param contains id, name, address, phonenumber, created_at, updated_at, is_deleted  
   */ 
  updateEmployee(id: any, name: any, address: any, phonenumber: any, is_deleted: any) {
    this.http.put('http://localhost:3330/employee/' + id, {id: id, name: name, address: address, 
      phonenumber: phonenumber, is_deleted: is_deleted}).subscribe((response: any) => {
      if(response.error) {
        this.toastr.error(response.error, 'Error');
      } else {
        console.log(response.message)
        this.toastr.success(response.message, 'Success');
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
    this.http.post('http://localhost:3330/employee/' + id, {id: id}).subscribe((response: any) => {
      if(response.error) {
        this.toastr.error(response.error, 'Error');
      } else {
        this.toastr.success(name + response.message, 'Success');
      }
    });
  }


  /**
   * To check employee exists or not
   * 
   * * @param contains name, address, phonenumber, created_at, updated_at, is_deleted 
   */ 
  isEmployeeExists(id: any, name: any, address: any, phone_number: any, is_deleted: any) {
    this.http.post('http://localhost:3330/isEmployeeExist', {phonenumber: phone_number, id: id}).subscribe((response: any) => {
      console.log(response.message)
      if(response.message == 'add') { 
        this.addEmployee(name, address, phone_number, is_deleted);
      } else if(response.message == 'update') {
        this.updateEmployee(id, name, address, phone_number, is_deleted);
      } else {
        this.toastr.error(response.message , 'Error');
      }
    });
  }
}