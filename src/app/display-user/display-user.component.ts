// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { DialogEmployeeComponent } from '../dialog-employee/dialog-employee.component';
// import { UserServiceService } from '../user-service.service';

// @Component({
//   selector: 'app-display-user',
//   templateUrl: './display-user.component.html',
//   styleUrls: ['./display-user.component.scss']
// })
// export class DisplayUserComponent implements OnInit {

//   users: any = [];
//   page = 1;
//   total_count: any;

//   constructor(private user_service: UserServiceService,
//     private dialog: MatDialog, private router: Router) { }

//   ngOnInit(): void {
//     this.fetchUsers(this.page);
//   }

//   /**
//    * To get all user
//    * 
//    * @param page contains page number
//    */
//    fetchUsers(page: any): void {
//     this.user_service.getUsers().subscribe(data => {
//       this.users = data.rows;
//       this.total_count = data.count;
//     }, err => {  
//       console.log(err);
// if(401 == err.status) {
//   this.toastr.error(err.error.message, Constants.ERROR);
// }
//     });
//   }

//     /**
//    * To get employee data for particular page when click on page number
//    * 
//    * @param event contains page number
//    */
//      onPaginationClick(event: any): void {
//       this.fetchUsers(event);
//     }
  
//     /**
//      * To delete employee data
//      *  
//      * @param id contains employee id
//      * @param name contains employee name
//      */
//     deleteEmployee(id: any, name: any) {
//       const dialogRef = this.dialog.open(DialogEmployeeComponent,{
//         disableClose: true,
//         data:{name: name}
//       });
//       dialogRef.afterClosed().subscribe(result => {
//         if(true == result) {
//           //this.user_service.deleteEmployee(id, name);
//           this.fetchUsers(this.page);
//         }
//       });
//     }
  
//     /**
//      * To delete employee data 
//      * 
//      * @param id contains employee id
//      */
//     navigateToEdit(id: any) {
//       this.router.navigate(['/edit/' + id]);
//     }

// }
