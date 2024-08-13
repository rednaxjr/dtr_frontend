import { Component, Input, OnInit, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormsModule, FormControl, FormGroup, } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';
import { MatPaginatorModule, MatPaginator, } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource, } from '@angular/material/table';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule, FormsModule, MatTableModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  
  displayedColumns = ['name',   "action"];
  dataSource = new MatTableDataSource(this.data);
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private storageService: StorageService,
  ) {
    console.log(this.data)
  }
  ngOnInit(): void { 
    throw new Error('Method not implemented.');

  }
}
