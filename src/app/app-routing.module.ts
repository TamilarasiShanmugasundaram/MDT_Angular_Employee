import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AppWrapperComponent } from './app-wrapper/app-wrapper.component';
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './authentication.guard';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';
//import { DisplayUserComponent } from './display-user/display-user.component';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: '', component: AppWrapperComponent, children: [
    { path: 'add', component: AddEmployeeComponent},
    {path: 'display', component: DisplayEmployeeComponent},
    {path: 'edit/:id', component: AddEmployeeComponent}
  ]},
  {path:'register', component:AddUserComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
