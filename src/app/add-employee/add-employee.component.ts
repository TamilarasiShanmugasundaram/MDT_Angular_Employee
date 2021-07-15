import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import {formatDate } from '@angular/common';

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
  durationInSeconds = 5;  
  today= new Date();
  todaysDataTime = '';
  updated_at: any;
  created_at: any;
  is_deleted:boolean =  false;

  constructor(private employee_service: EmployeeServiceService) { }
  ngOnInit(): void {
     
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
