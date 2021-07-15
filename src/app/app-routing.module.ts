import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';


const routes: Routes = [
  {path:'add',component:AddEmployeeComponent},
  {path:'display',component:DisplayEmployeeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
