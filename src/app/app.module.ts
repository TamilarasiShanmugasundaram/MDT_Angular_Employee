import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToastrModule} from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {  MatSidenavModule } from '@angular/material/sidenav';
import { CdkTableModule} from '@angular/cdk/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NotificationComponent } from './notification/notification.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import {MatPaginatorModule } from '@angular/material/paginator';

import { DisplayEmployeeComponent } from './display-employee/display-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    DisplayEmployeeComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    CdkTableModule,
    MatTableModule,
    //NgbPaginationModule,
    ToastrModule.forRoot(),
    MatSnackBarModule,
    NgbModule,
    //MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
