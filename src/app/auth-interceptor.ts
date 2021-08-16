import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

import { LoginServiceService } from "./login-service.service";

@Injectable()
export class AuthInterceptor  implements HttpInterceptor {  
  constructor(private login_service: LoginServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
  const token = localStorage.getItem("token"); 
    if (!token) {
      return next.handle(req);
    }
    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });  
    return next.handle(req1);
  } 
}