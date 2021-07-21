import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import {formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  providers: [DatePipe]
})
export class AddEmployeeComponent implements OnInit {

  name: string = '';
  address: string = '';
  phonenumber: string = '';
  updated_at: any;
  created_at: any;
  is_deleted:boolean =  false;
  // today= new Date();
  // todaysDataTime = '';
  url: string = '';
  routeSub: any;
  id: any;
  employees: any;
  employee: any;

  constructor(private employee_service: EmployeeServiceService, private route: ActivatedRoute, 
    private http: HttpClient) { }
  ngOnInit(): void {
    this.url = window.location.href;
    if('http://localhost:4200/add' != this.url) {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.employees  = this.employee_service.getEmployeeById(this.id).subscribe(data => {
        this.employees = data;
        for(let i = 0; i < 1; i++) {
          this.employee = this.employees[i];
          this.name = this.employee.name;
          this.address = this.employee.address;
          this.phonenumber = this.employee.phone_number;
        }
      }, err => {  
        console.log("Error occured." + err);
      });
     });
    }
  }

  /**
   * To add employee data
   * 
   * @param form contains name, address, phone_number
   */
  onSubmit(form: NgForm) {
    this.id = this.route.snapshot.paramMap.get('id');
    let name = form.controls['name'].value;
    let address = form.controls['address'].value;
    let phone_number = form.controls['phonenumber'].value;
    //this.todaysDataTime = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530');
    if(null != this.id) {
      this.employee_service.isEmployeeExists(this.id, name, address,
        phone_number, this.is_deleted);
    } else {
      this.employee_service.isEmployeeExists(0, name, address,
        phone_number, this.is_deleted);
    }  
    this.url = window.location.href;
    if('http://localhost:4200/add' == this.url) {
      form.resetForm();  
    } 
  }  
}
