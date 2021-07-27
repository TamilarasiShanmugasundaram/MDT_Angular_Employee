import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog"; 
import { Router } from '@angular/router';
import { Constants } from '../constants';

import { DialogEmployeeComponent } from '../dialog-employee/dialog-employee.component';


@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.scss']
})
export class DisplayEmployeeComponent implements OnInit {

  employees: any = [];
  page = 1;
  total_count: any;

  constructor(private employee_service: EmployeeServiceService,
    private dialog: MatDialog, private router: Router) { }

  /**
   * To get employee data when page load
   */
  ngOnInit(): void {
    this.fetchEmployees(this.page);
  }

  /**
   * To get employee data
   * 
   * @param page contains page number
   */
  fetchEmployees(page: any): void {
    this.employee_service.getEmployees(page).subscribe(data => {
      this.employees = data.rows;
      this.total_count = data.count;
    }, err => {  
      console.log(err);
    });
  }
  
  /**
   * To get employee data for particular page when click on page number
   * 
   * @param event contains page number
   */
  onPaginationClick(event: any): void {
    this.fetchEmployees(event);
  }

  /**
   * To delete employee data
   *  
   * @param id contains employee id
   * @param name contains employee name
   */
  deleteEmployee(id: any, name: any) {
    const dialogRef = this.dialog.open(DialogEmployeeComponent,{
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
   * To delete employee data 
   * 
   * @param id contains employee id
   */
  navigateToEdit(id: any) {
    this.router.navigate(['/edit/' + id]);
  }
}
