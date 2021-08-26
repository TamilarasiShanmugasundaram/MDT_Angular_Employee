import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Constants } from '../constants';
import { EmployeeServiceService } from '../employee-service.service';
import { LoginServiceService } from '../login-service.service';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  providers: []
})
export class AddEmployeeComponent implements OnInit {

  name: string = '';
  address: string = '';
  phone_number: string = '';
  email: string = '';
  id: any;
  employees: any;
  url:any = '';

  constructor(private employee_service: EmployeeServiceService, private route: ActivatedRoute, 
    private dialog: MatDialog, private router: Router, private toastr: ToastrService) { }

  /**
   * Get a employee detail by id to update 
   */
  ngOnInit(): void {
    this.url = this.router.url;
    if('/add' != this.router.url) {
      this.id = this.route.snapshot.paramMap.get(Constants.ID);
      if(this.id) {
        this.employee_service.getEmployeeById(this.id).subscribe(data => {
          this.name = data.name;
          this.address = data.address;
          this.phone_number = data.phone_number;
          this.email = data.email;
        }, err => {  
          console.log(err);
          if(401 == err.status) {
            this.toastr.error(err.error.message, Constants.ERROR);
          }
        });
      }
    }
  }

  /**
   * Create a employee
   * 
   * @param form contains a employee details
   */
  onSubmit(form: NgForm) {
    this.id = this.route.snapshot.paramMap.get(Constants.ID);
    let name = form.controls[Constants.NAME].value;
    let address = form.controls[Constants.ADDRESS].value;
    let phone_number = form.controls[Constants.PHONENUMBER].value;
    let email = form.controls[Constants.EMAIL].value;
    if(this.id) {
      this.employee_service.updateEmployee(this.id, name, address, phone_number, email);
    } else {        
      this.employee_service.addEmployee(name, address, phone_number, email);
    }  
  }  

  
}
