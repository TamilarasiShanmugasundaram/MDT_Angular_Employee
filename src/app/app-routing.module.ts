import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';
import { DisplayUserComponent } from './display-user/display-user.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'add',component:AddEmployeeComponent},
  {path:'addUser',component:AddUserComponent},
  {path:'edit/:id',component:AddEmployeeComponent},
  {path:'display',component:DisplayEmployeeComponent},
  {path:'displayUser',component:DisplayUserComponent},
  {path:'login',component:LoginComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
