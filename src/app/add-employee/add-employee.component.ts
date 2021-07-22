import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../constants';

import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  providers: []
})
export class AddEmployeeComponent implements OnInit {

  name: string = '';
  address: string = '';
  phonenumber: string = '';
  id: any;
  employees: any;
  url:any = '';

  constructor(private employee_service: EmployeeServiceService, private route: ActivatedRoute, 
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.url = this.router.url;
    if('/add' != this.router.url) {
      this.id = this.route.snapshot.paramMap.get(Constants.ID);
      this.employee_service.getEmployeeById(this.id).subscribe(data => {
        this.name = data.name;
        this.address = data.address;
        this.phonenumber = data.phonenumber;
      }, err => {  
        console.log(err);
      });
    }
  }

  /**
   * To add employee data
   * 
   * @param form contains name, address, phone_number
   */
  onSubmit(form: NgForm) {
    this.id = this.route.snapshot.paramMap.get(Constants.ID);
    let name = form.controls[Constants.NAME].value;
    let address = form.controls[Constants.ADDRESS].value;
    let phone_number = form.controls[Constants.PHONENUMBER].value;
    if(null != this.id) {
      this.employee_service.isEmployeeExists(this.id, name, address, phone_number).subscribe(data => {
        if(data.message) {
          this.employee_service.updateEmployee(this.id, name, address, phone_number);
        } else {
          this.toastr.error(phone_number + Constants.ALREADY_EXISTS, Constants.ERROR);
        }
      }, err => {  
        console.log(err);
      });
    } else {        
      this.employee_service.isEmployeeExists(null, name, address, phone_number).subscribe(data => {
        if(data.message) {
          this.employee_service.addEmployee(name, address, phone_number);
        } else {
          this.toastr.error(phone_number + Constants.ALREADY_EXISTS, Constants.ERROR);
        }
      }, err => {  
        console.log(err);
      });
    }  
  }  
}
