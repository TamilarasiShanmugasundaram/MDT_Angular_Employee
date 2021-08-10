import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Constants } from '../constants';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  first_name: string = '';
  last_name: string = '';
  username: string = '';
  address: string = '';
  phone_number: string = '';
  email: string = '';
  password: string = '';

  constructor(private user_service: UserServiceService, private route: ActivatedRoute, 
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    this.first_name = form.controls[Constants.FIRST_NAME].value;
    this.last_name = form.controls[Constants.LAST_NAME].value;
    this.username = form.controls[Constants.USERNAME].value;
    this.address = form.controls[Constants.ADDRESS].value;
    this.phone_number = form.controls[Constants.PHONENUMBER].value;
    this.email = form.controls[Constants.EMAIL].value;
    this.password = form.controls[Constants.PASSWORD].value;
    this.user_service.addUser(this.first_name, this.last_name, this.username, 
      this.address, this.phone_number, this.email, this.password);
  } 
}
