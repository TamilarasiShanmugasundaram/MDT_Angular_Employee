import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog"; 
@Component({
  selector: 'app-dialog-employee',
  templateUrl: './dialog-employee.component.html',
  styleUrls: ['./dialog-employee.component.scss']
})
export class DialogEmployeeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  

}
