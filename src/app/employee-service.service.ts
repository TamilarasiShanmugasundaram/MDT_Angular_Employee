import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }
  
  /**
   * To add employee data
   * 
   * @param contains name, address, phonenumber, created_at, updated_at, is_deleted 
   */
  addEmployee(name: any, address: any, phonenumber: any, 
          created_at:any, updated_at:any, is_deleted: any) {
    this.http.post('http://localhost:3330/employee', {name: name, address: address, 
            phonenumber: phonenumber, created_at: created_at, updated_at: updated_at,
      is_deleted: is_deleted}).subscribe((response: object) => {
        if(null != response) {
          this.toastr.success(name + ' added successfully', 'Success');
          this.router.navigate(['/display']);
        } 
      });
    }

  /**
   * To add employee data
   * 
   * @param contains name, address, phonenumber, created_at, updated_at, is_deleted 
   */
  deleteEmployee(id: any) {
    this.http.post('http://localhost:3330/employee/' + id, {id: id}).subscribe((response: object) => {
      if(null != response) {
        this.toastr.success(' Deleted successfully', 'Success');
        this.getEmployee();
        //this.router.navigate(['/display']);
      } 
    });
  }
  /**
   * To get employee data
   */ 
  getEmployee() {
    return this.http.get('http://localhost:3330/employee').subscribe(data => {
    },
    err => {  
      console.log("Error occured." + err);
    });  
  }

  /**
   * To check employee exists or not
   */ 
  isEmployeeExists(name: any, address: any, phonenumber: any, 
    created_at:any, updated_at:any, is_deleted: any) {
    this.http.post('http://localhost:3330/checkemployee', {phonenumber: phonenumber}).subscribe((response: any) => {
      if(phonenumber == response) {
        this.addEmployee(name, address, phonenumber, created_at, updated_at, is_deleted);
      } else {
        this.toastr.error(response , 'Error');
      }
    });
  }

  /**
   * To update employee
   */ 
  updateEmployee(id: any) {

  }
}