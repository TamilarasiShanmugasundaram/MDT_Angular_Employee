import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DisplayEmployeeComponent } from '../display-employee/display-employee.component';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    
  }
  name: string = '';
  address: string = '';
  phonenumber: string = '';
  durationInSeconds = 5;
  /**
   * To add employee data
   * 
   * @param form contains name, address, phone_number
   */
  onSubmit(form:NgForm) {
    let name = form.controls['name'].value;
    let address = form.controls['address'].value;
    let phone_number = form.controls['phonenumber'].value;
    this.http.post('http://localhost:3330/employee',{name: name, address: address, 
            phonenumber: phone_number }).subscribe((response: object) => {
      if(null != response)
        this._snackBar.openFromComponent(NotificationComponent, {
            duration: this.durationInSeconds * 300,
            data: 'Employee added successfully',
            verticalPosition: 'top',
            horizontalPosition: 'right'
        });
      });
    form.resetForm();   
  }  
}
