import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private router: Router, private login_service: LoginServiceService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  /**
   * Navigate to logout page
   */
   navigateToLogout() {
    const dialogRef = this.dialog.open(LogoutDialogComponent,{
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if(true == result) {
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Navigate to create page
   */
   navigateToCreate() {
    this.login_service.is_authenticate = true;
    this.router.navigate(['/add']);
  }

  /**
   * Navigate to display page
   */
  navigateToDisplay() {
    this.login_service.is_authenticate = true;
    this.router.navigate(['/display']);
  }

}
