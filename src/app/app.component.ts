import { Component, Inject } from '@angular/core';
import { RouterOutlet, RouterModule, Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  indexBG = 'src/assets/img/background.jpg';
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {  }
  ngOnInit() { 
    if (this.authService.isAuthenticated()) {
      
      console.log("naa")
    } else { 
      console.log("wala")

    }
  }
}
