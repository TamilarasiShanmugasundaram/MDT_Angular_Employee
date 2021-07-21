import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'angularMedtronic';
  url: string = '';
  
  constructor(private router: Router){ }

  /**
   * To get current page url on page load
   */
  ngOnInit(): void {
    this.url = window.location.href;
  }
  
  /**
   * Navigate to add page
   */
  add() {
    this.router.navigate(['/add']);    
  }

  /**
   * Navigate to display page
   */
  display() {
    this.router.navigate(['/display']);
  }
}

