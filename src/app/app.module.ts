import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CdkTableModule} from '@angular/cdk/table';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon'
import { ToastrModule} from 'ngx-toastr';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';
import { DatePipe } from '@angular/common';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { DialogEmployeeComponent } from './dialog-employee/dialog-employee.component';
@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    DisplayEmployeeComponent,
    DialogEmployeeComponent
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
    ToastrModule.forRoot({ timeOut: 3500,
      positionClass:'toast-top-right',  
      closeButton: true,
      preventDuplicates: true,}),
    MatSnackBarModule,
    NgbModule,
    MatIconModule,
    MatDialogModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
