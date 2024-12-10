import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, OnInit, AfterContentInit } from '@angular/core';
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

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-table2',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule, FormsModule, MatTableModule, MatPaginatorModule],
  templateUrl: './table2.component.html',
  styleUrl: './table2.component.css'
})
export class Table2Component implements AfterContentInit {
  @Input() data: any[] = [];
  @Input() labels: any[] = [];
  // @ContentChild(TemplateRef) actions?: any; 
  // @ContentChild(TemplateRef) actions2?: any; 
  @ContentChild('actions') actionsTemplate?: TemplateRef<any>|any;
  @ContentChild('actions2') actions2Template?: TemplateRef<any>|any;
  @ContentChild(TemplateRef) time_log?: any;

  isXSmall: boolean=false;
  isMedium: boolean=false;
  isXLarge: boolean=false; 
  isLarge: boolean=false; 
  isSmall: boolean=false; 
  dropDownisShown:boolean=false;
  constructor(
    private router: Router,
    private userService: UserService,
    private storageService: StorageService, 
    private breakpointObserver: BreakpointObserver
  ) { 
  }
  ngOnInit(): void {
    this.breakpointObserver.observe([ 
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      this.isXSmall = result.breakpoints[Breakpoints.XSmall];
      this.isSmall = result.breakpoints[Breakpoints.Small];
      this.isMedium = result.breakpoints[Breakpoints.Medium];
      this.isLarge = result.breakpoints[Breakpoints.Large];
      this.isXLarge = result.breakpoints[Breakpoints.XLarge];
      if (   this.isLarge || this.isXLarge) {
        this.dropDownisShown = true;
      
      }else{
        this.dropDownisShown = false; 
      }

    });

  }
  ngAfterContentInit(): void {
    if (!this.actionsTemplate) {
      console.error('actions template is not provided!');
    }
    if (!this.actions2Template) {
      console.error('actions2 template is not provided!');
    }
  }

}
