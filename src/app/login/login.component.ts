import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../constants';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String ='';
  password: String ='';
  constructor(private login_service: LoginServiceService,  private router: Router,  
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  /**
   * Login user
   * 
   * @param form contain login credentials
   */
  login(form: NgForm) {
    this.username = form.controls[Constants.USERNAME].value;
    this.password = form.controls[Constants.PASSWORD].value;
    this.login_service.logInUser(this.username, this.password);
  } 
  
  /**
   * Navigate to logout page
   */
  navigateToRegister()  {
    this.router.navigate(['/addUser']);
  }
}
