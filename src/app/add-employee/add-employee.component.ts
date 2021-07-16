import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import {formatDate } from '@angular/common';

import { EmployeeServiceService } from '../employee-service.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  durationInSeconds = 5;  
  today= new Date();
  todaysDataTime = '';
  updated_at: any;
  created_at: any;
  is_deleted:boolean =  false;
  url: string = '';
  routeSub: any;
  id: any;
  employees: any;
  employee: any;
  length: any;

  constructor(private employee_service: EmployeeServiceService, private route: ActivatedRoute,private http: HttpClient) { }
  ngOnInit(): void {
    this.url = window.location.href;
    if('http://localhost:4200/add' != this.url) {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      //this.employee_service.updateEmployee(this.id);
      this.http.get('http://localhost:3330/employee/' + this.id).subscribe(data => {
        this.employees = data;
        this.length = Object.keys(data).length;
        console.log('len  ', this.length)
        for(let i = 0; i < 1; i++) {
          console.log('emp', this.employees[i])
          this.employee[i] = this.employees[i];
          this.name = this.employee[i].name;
          this.address = this.employee[i].address;
          this.phonenumber = this.employee[i].phonenumber;
        }
      },
      err => {
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
    let name = form.controls['name'].value;
    let address = form.controls['address'].value;
    let phone_number = form.controls['phonenumber'].value;
    this.todaysDataTime = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530');
    this.employee_service.isEmployeeExists(name, address,
        phone_number, this.todaysDataTime, this.todaysDataTime, this.is_deleted);
    form.resetForm();   
  }  
}
