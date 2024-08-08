import { Component } from '@angular/core';
import { Routes, RouterModule, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-index-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './index-layout.component.html',
  styleUrl: './index-layout.component.css'
})
export class IndexLayoutComponent {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    // if (!this.authService.isAuthenticated()) {
    //   this.router.navigate(['/']);
    // }else{
      
    // }
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['user/dashboard']);
      console.log("naa")
    } else {
      this.router.navigate(['/']);
      console.log("wala")

    }
  }
}