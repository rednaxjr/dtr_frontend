import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, FormControl, FormGroup, } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator, } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource, } from '@angular/material/table';
import { UserService } from '../../../services/user.service';
import { StorageService } from '../../../services/storage.service';
import { TimeLogService } from '../../../services/time-log.service';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule, FormsModule, MatTableModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() labels: any[] = [];
  @ContentChild(TemplateRef) actions?: any;
  

  constructor(
    private router: Router,
    private userService: UserService,
    private storageService: StorageService,
  ) { 
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');

  }

}
