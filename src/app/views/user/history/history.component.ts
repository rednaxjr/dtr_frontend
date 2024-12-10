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
import { Table2Component } from '../../../component/table/table2/table2.component';
import { TimeLogService } from '../../../services/time-log.service';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
//imported components 
import { AddTimeComponent } from "../../../component/modal/add-time/add-time.component";

import { DateService } from '../../../services/date.service';
import { ConfirmationComponent } from '../../../component/modal/confirmation/confirmation.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MatIconModule, ConfirmationComponent, CommonModule, ReactiveFormsModule, FormsModule, MatTableModule, MatPaginatorModule, Table2Component, AddTimeComponent, MatDialogModule, MatButtonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  timeLogs: any[] = [];
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
    this.loadYears();
    this.loadMonths();
  }

  table_headers = [
    { text: "Date", field: "date" },
    { text: "Time Log", field: "logs" },
    { text: "Action", field: "action" },
  ];

  data: any[] = [];

  async getTLByDate() {
    if (this.selectedYear !== null && this.selectedMonth !== null) {
      const user = this.storageService.getDecodedToken('token');
      const data = {
        userId: user.id,
        year: this.selectedYear,
        month: this.selectedMonth + 1,
      };
      this.userService.getTLByDate(data).subscribe(
        (res: any) => {
          if (res.message != "No data found") {
            var log_data = res.logPerDay

            for (let i = 0; i < log_data.length; i++) {
              log_data[i].isOpen = false;
            }
            this.timeLogs = log_data;
          }
          this.timeLogs = [];
          console.log(this.timeLogs)
        },
        (error) => {
          console.error('Error fetching time logs:', error);
        }
      );
    }
  }
  openAddTime() {
    const title = "Add"

    var date = [];
    var logs = [];
    for (let i = 0; i < this.timeLogs.length; i++) {
      date.push(this.timeLogs[i].date);
      logs.push(this.timeLogs[i].logs);
    }
    const dialogRef = this.dialog.open(AddTimeComponent, {
      panelClass: 'custom-container',
      height: 'auto',
      width: '70%',
      data: { title: title, date: date, logs: logs }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  filter() {
    console.log("filter")
    this.timeLogs = [];
    if (this.selectedYear !== null && this.selectedMonth !== null) {
      const user = this.storageService.getDecodedToken('token');
      const data = {
        userId: user.id,
        year: this.selectedYear,
        month: Number(this.selectedMonth) + 1,
      };

      this.userService.getTLByDate(data).subscribe(
        (res: any) => {
          var log_data = res.logPerDay
          for (let i = 0; i < log_data.length; i++) {
            log_data[i].isOpen = false;
          }
          this.timeLogs = log_data;
          console.log(this.timeLogs)
        },
        (error) => {
          console.error('Error fetching time logs:', error);
        }
      );
    }
  }

  add(data: any, index: any) {

    const title = "Add";
    var date = [];
    date.push(data.date);
    const dialogRef = this.dialog.open(AddTimeComponent, {
      panelClass: 'custom-container',
      height: 'auto',
      width: '70%',
      data: { title: title, date: date }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });


  }
  update(data: any, index: any) {
    var dateStr = data.date_time.split('T')[0];
    const title = "Update";
    var date = [];
    date.push(dateStr);
    const dialogRef = this.dialog.open(AddTimeComponent, {
      panelClass: 'custom-container',
      height: 'auto',
      width: '70%',
      data: { title: title, date: date, id: data.time_log_id, time: this.convert(data.time) }
    });

  }

  view(data: any, index: any) {
    const log = this.timeLogs[index];
    if (log) {
      log.isOpen = !log.isOpen;
      this.timeLogs[index] = { ...log };
    }
  }


 
  del(data: any, index: any) {
    const newData =
    {
      id: data.time_log_id
    }
    const title = "Delete";
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      panelClass: 'custom-container',
      height: 'auto',
      width: '70%',
      data: {
        title: title, id: data.time_log_id, type: "delete", msg: "Are you sure you want to delete this data?",
        api: "this.timeLogService.deleteLog",
      }
    });

    dialogRef.componentInstance.confirmAction.subscribe((result) => {
      if (result.type == "delete") {

        this.timeLogService.deleteLog(result.data).subscribe((res: any) => {
          console.log(res.message)
        })
      }
    });
  }
  async loadYears() {
    try {
      this.years = await this.dateService.getYears();
      const currentYear = new Date().getFullYear();
      this.selectedYear = currentYear;
      this.getTLByDate(); // Fetch logs after setting the year
    } catch (error) {
      console.error('Error loading years:', error);
    }
  }

  async loadMonths() {
    try {
      const d = new Date();
      this.months = await this.dateService.getMonths();
      this.selectedMonth = Number(d.getMonth()); // Set current month
      // this.selectedMonth = parseInt(this.selectedMonth)
      this.getTLByDate(); // Fetch logs after setting the month
    } catch (error) {
      console.error('Error loading months:', error);
    }
  }
  convert(data: any) {
    const [time, modifier] = data.split(' '); // Split the time and AM/PM part
    let [hours, minutes] = time.split(':'); // Split hours and minutes

    if (modifier === 'PM' && hours !== '12') {
      hours = String(parseInt(hours) + 12); // Convert PM hours (except 12 PM)
    } else if (modifier === 'AM' && hours === '12') {
      hours = '00'; // Convert 12 AM to 00 hours
    }

    return `${hours.padStart(2, '0')}:${minutes}:00`; // Format as HH:mm:ss
  }
}