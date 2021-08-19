import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import {MatDialog} from "@angular/material/dialog"; 
import { Router } from '@angular/router';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { Constants } from '../constants';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from '../login-service.service';


@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.scss']
})
export class DisplayEmployeeComponent implements OnInit {

  employees: any = [];
  page = 1;
  total_count: any;

  constructor(private employee_service: EmployeeServiceService, private toastr: ToastrService,
    private dialog: MatDialog, private router: Router, private login_service: LoginServiceService) { }

  /**
   * To get employee details when page load
   */
  ngOnInit(): void {
    this.fetchEmployees(this.page);
  }

  /**
   * To get employee 
   * 
   * @param page contains page number
   */
  fetchEmployees(page: any): void {
    this.employee_service.getEmployees(page).subscribe(data => {
      this.employees = data.rows;
      this.total_count = data.count;
    }, err => {  
      console.log(err);
      if(401 == err.status) {
        this.toastr.error(err.error.message, Constants.ERROR);
      }
    });
  }
  
  /**
   * To get employee details for particular page when click on page number
   * 
   * @param event contains page number
   */
  onPaginationClick(event: any): void {
    this.fetchEmployees(event);
  }

  /**
   * To delete employee by id
   *  
   * @param id contains employee id
   * @param name contains employee name
   */
  deleteEmployee(id: any, name: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      disableClose: true,
      data:{name: name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(true == result) {
        this.employee_service.deleteEmployee(id, name);
        this.fetchEmployees(this.page);
      }
    });
  }

  /**
   * Navigate to edit page
   * 
   * @param id contains employee id
   */
  navigateToEdit(id: any) {
    this.login_service.is_authenticate = true;
    this.router.navigate(['/edit/' + id]);
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
   * Navigate to create page
   */
  navigateToCreate() {
    this.login_service.is_authenticate = true;
    this.router.navigate(['/add']);
  }

  /**
   * Navigate to display page
   */
  navigateToDisplay() {
    this.login_service.is_authenticate = true;
    this.router.navigate(['/display']);
  }
}
