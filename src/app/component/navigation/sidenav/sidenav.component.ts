import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, OnInit } from '@angular/core';
 
import { UserService } from '../../../services/user.service'; 
import { TimeLogService } from '../../../services/time-log.service'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { Routes, RouterModule, Router, RouterOutlet, RouterLink, RouterLinkActive, } from '@angular/router';
 
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
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule, MatButtonModule ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
  
  @Input() labels: any[] = []; 
  constructor(
    private router: Router,
    private userService: UserService,
    private storageService: StorageService,
  ) { 
  }


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
