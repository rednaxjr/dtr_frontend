import { Component, OnInit } from '@angular/core';
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

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { DateService } from '../../../services/date.service';
import { ConfirmationComponent } from '../../../component/modal/confirmation/confirmation.component';
import { TableComponent } from '../../../component/table/table/table.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [MatIconModule, ConfirmationComponent, CommonModule, ReactiveFormsModule, FormsModule, MatTableModule, MatPaginatorModule, TableComponent, MatDialogModule, MatButtonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  reports: any[] = [];
  years: any[] = [];
  months: any[] = [];
  selectedMonth: number | null = null;
  selectedYear: number | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private storageService: StorageService,
    private timeLogService: TimeLogService,
    public dialog: MatDialog,
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
    this.loadData()


  }
  async loadData() {
    this.loadYears();
    this.loadMonths();
    this.getReportByDate();
  }

  table_headers = [
    { text: "Date", field: "date" },
    { text: "Report", field: "report_data" },
    { text: "Action", field: "action" },
  ];

  data: any[] = [];

  async getReportByDate() {
    if (this.selectedYear !== null && this.selectedMonth !== null) {
      const user = this.storageService.getDecodedToken('token');
      const data = {
        userId: user.id,
        year: this.selectedYear,
        month: this.selectedMonth + 1,
      };
      this.userService.getReportsByDate(data).subscribe((res: any) => {
        this.reports = res.data;
   
        var status = "";
        var report = "";
        if (res.data) {
          if (res.data.length > 0) {

            this.reports.forEach((element: any, index: any) => {
              if (element.report) {
                report = element.report[0].report;
                console.log(report)
              } else {
                report = "N/A";
              }
              element = Object.assign(element, {
                report_data: report,

              });
              report = "";
            });

          }
        }
      });

    }
  }

  async loadYears() {
    try {
      this.years = await this.dateService.getYears();
      const currentYear = new Date().getFullYear();
      this.selectedYear = currentYear;
      this.getReportByDate();
    } catch (error) {
      console.error('Error loading years:', error);
    }
  }

  async loadMonths() {
    try {
      const d = new Date();
      this.months = await this.dateService.getMonths();
      this.selectedMonth = Number(d.getMonth());
      this.getReportByDate();
    } catch (error) {
      console.error('Error loading months:', error);
    }
  }
  filter() {
    this.reports = [];
    if (this.selectedYear !== null && this.selectedMonth !== null) {
      const user = this.storageService.getDecodedToken('token');
      const data = {
        userId: user.id,
        year: this.selectedYear,
        month: Number(this.selectedMonth) + 1,
      };

      // this.userService.getTLByDate(data).subscribe(
      //   (res: any) => {
      //     var log_data = res.logPerDay
      //     for (let i = 0; i < log_data.length; i++) {
      //       log_data[i].isOpen = false;
      //     }
      //     this.timeLogs = log_data;
      //     console.log(this.timeLogs)
      //   },
      //   (error) => {
      //     console.error('Error fetching time logs:', error);
      //   }
      // );
    }
  }
  view(data: any, index: any) {

    console.log(data)
  }




}
