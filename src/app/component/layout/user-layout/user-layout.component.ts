import { Component, ViewChild, HostListener } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Routes, RouterModule, Router, RouterOutlet, RouterLink, RouterLinkActive, } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { StorageService } from '../../../services/storage.service';
StorageService
@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule, MatButtonModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {
  // showToggle: string;
  // mode: string;
  // openSidenav: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) { }

  sideBarRoutes = [
    { path: 'dashboard', name: "Dashboard", icon: "dashboard" },
    { path: 'profile', name: "Profile", icon: "person" },
  ]


  private screenWidth$ = new BehaviorSubject<number>
    (window.innerWidth);

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['user/dashboard']);
      console.log("naa")
    } else {
      this.router.navigate(['/']);
      console.log("wala")
    }
  }
  logout() {
    this.storageService.clear();
    window.location.reload();
  }
}