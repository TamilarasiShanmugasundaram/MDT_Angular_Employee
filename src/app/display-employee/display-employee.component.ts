import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeServiceService } from '../employee-service.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog"; 
import { DialogEmployeeComponent } from '../dialog-employee/dialog-employee.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.scss']
})
export class DisplayEmployeeComponent implements OnInit {

  constructor(private http: HttpClient, private employee_service: EmployeeServiceService,
    private dialog: MatDialog, private router: Router) { }
  employees: any = [];
  first_ten_employees:any = [];
  page = 1;
  pageSize = 10;
  length = 0;
  collectionSize = 0;
  limit = 0;

  /**
   * To get employee data when page load
   */
  ngOnInit(): void {
    this.fetchEmployees();
  }

  /**
   * To get employee data
   */
  fetchEmployees(): void {
    // this.employees  = this.employee_service.getEmployee();
    // this.length = Object.keys(this.employees).length;
    // alert( this.length)
    this.http.get('http://localhost:3330/employee').subscribe(data => {
      this.employees = data;
      this.length = Object.keys(this.employees).length;
      this.collectionSize = this.length;
      if(10 < this.length) {
        for(let i = 0; i < 10; i++) {
          this.first_ten_employees[i] = this.employees[i];
        }
        this.employees = this.first_ten_employees;
      }  
    },
    err => {
      console.log("Error occured." + err);
    });
  }
  
  /**
   * To get employee data for particular page when click on page number
   */
  onPaginationClick(event:any): void {
    if(1 == event) {
      this.fetchEmployees();
    } else {
      this.limit = (event-1)*10;
      this.http.get('http://localhost:3330/employee/' + this.limit).subscribe(data => {
        this.employees = data;
        this.length = Object.keys(data).length;
      },
      err => {
        console.log("Error occured." + err);
      });
    }  
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(DialogEmployeeComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(true == result) {
        alert(id)
        this.employee_service.deleteEmployee(id);
        this.fetchEmployees();
      }
    });
  }

  edit(id: any) {
    alert('id'+ id);
    this.router.navigate(['/add/' + id]);
  }
}
