import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CdkTableModule} from '@angular/cdk/table';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon'
import { ToastrModule} from 'ngx-toastr';
import { AppWrapperComponent } from './app-wrapper/app-wrapper.component';
import { MatCardModule} from '@angular/material/card';
import { MatDialogModule, MatDialogRef} from "@angular/material/dialog";

import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AuthInterceptor } from './auth-interceptor';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    DisplayEmployeeComponent,
    LoginComponent,
    AddUserComponent,
    LogoutDialogComponent,
    DeleteDialogComponent,
    SidenavComponent,
    AppWrapperComponent
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
    MatCardModule,
    ToastrModule.forRoot({ timeOut: 3500,
      positionClass:'toast-top-right',  
      closeButton: true,
      preventDuplicates: true,}),
    MatSnackBarModule,
    NgbModule,
    MatIconModule,
    MatDialogModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptor, 
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
