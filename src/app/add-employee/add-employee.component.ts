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
  id: any;
  employees: any;
  url:any = '';

  constructor(private employee_service: EmployeeServiceService, private route: ActivatedRoute, 
    private dialog: MatDialog, private router: Router, private toastr: ToastrService, 
    private login_service: LoginServiceService ) { }

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
    if(this.id) {
      this.employee_service.updateEmployee(this.id, name, address, phone_number);
    } else {        
      this.employee_service.addEmployee(name, address, phone_number);
    }  
  }  

  /**
   * Navigate to logout page
   */
   navigateToLogout() {
    const dialogRef = this.dialog.open(LogoutDialogComponent,{
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if(true == result) {
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Navigate to display employee page
   */
  navigateToDisplay() {
    this.login_service.is_authenticate = true;
    this.router.navigate(['/display']);
  }
}
