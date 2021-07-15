 import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.scss']
})
export class DisplayEmployeeComponent implements OnInit {

  constructor(private http: HttpClient) { }
  employees: any;
  page = 1;
  pageSize = 10;
  length = 0;
  collectionSize = 0;
  
  /**
   * To get employee data
   * 
   * @param form contains name, address, phone_number
   */
  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.http.get('http://localhost:3330/employee').subscribe(data => {
      this.employees = data;
      this.length = Object.keys(data).length;
      console.log(this.length);
      this.collectionSize = this.length;
    },
    err => {
      console.log("Error occured." + err);
    });
  }
  
    public onPaginationClick(event:any): void {
      alert(event)
      this.http.get('http://localhost:3330/employee/'+event).subscribe(data => {
        this.employees = data;
        this.length = Object.keys(data).length;
        console.log('len',this.length);
      },
      err => {
        console.log("Error occured." + err);
      });
    }

}
