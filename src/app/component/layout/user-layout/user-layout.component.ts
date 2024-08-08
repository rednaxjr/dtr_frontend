import { Component } from '@angular/core';
import { Routes, RouterModule, Router ,RouterOutlet} from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['user/dashboard']);
      console.log("naa")
    } else {
      this.router.navigate(['/']);
      console.log("wala") 
    }
  }
}