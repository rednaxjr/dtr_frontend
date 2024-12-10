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
import { TableComponent } from '../../../component/table/table/table.component';
import { TimeLogService } from '../../../services/time-log.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule, FormsModule, MatTableModule, MatPaginatorModule, TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private storageService: StorageService,
    private timeLogService: TimeLogService,
  ) {

  }
  table_headers: any = [
    { text: "Date", field: "date" },
    { text: "Time", field: "time" },
    { text: "Location", field: "loc" },
    { text: "Status", field: "status" },
    // { text: "Action", field: "action" },
  ];
  userData: any = {};
  users: any = [];
  timeLogs: any = [];
  items:any=[];
  ngOnInit(): void { 
    const decodedToken = this.storageService.getDecodedToken('token');
    // console.log(this.storageService.getToken())
    this.userData = decodedToken;
    this.loadUserTodayLogsById();
  }

 
  async getUserTimeLogsById() {
    const data = {  id: this.userData.id  } 
    this.userService.getUserTimeLogById(data).subscribe((res: any) => { 
     
    }, (error) => {
      console.log(error)
    })
  } 
  async loadUserTodayLogsById() {
    const data = { id: this.userData.id  } 
    this.userService.getUserTodayLogsById(data).subscribe((res: any) => { 
      this.timeLogs = res.data || [];
      var status = ""; 
      var date;
      var time;
      
      this.timeLogs.forEach((element: any, index: any) => { 
        var d = new Date(element.date_time); 
        date = d.toLocaleString('default', { month: 'short', day:"2-digit", year:"numeric" }); 
        time = d.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: true }) 
        if (index % 2 === 0) {
          status = "Time In"
        } else {
          status = "Time Out"
        } 
        element = Object.assign(element, {
          status: status, 
          date:date,
          time:time,
        });
        status = ""; 
        time = "";
        date=""; 
      });   
    }, (error) => {
      console.log(error)
    })
  }
  async getAllUsers() {



    const data = {
      name: "Sample"
    }
    this.userService.getAllUsers().subscribe((res: any) => {
      this.users = res;


      console.log(res)
    }, (error) => {
      console.log(error)
    })
  }
  async clockIn() {
    const data = {
      id: this.userData.id
    }
    this.timeLogService.addLog(data).subscribe((res: any) => {
      this.loadUserTodayLogsById(); 
    }, (error) => {
      console.log(error)
    })
  }

  onRowClick(row: any) {
    console.log('Row clicked:', row);
  }
  async update(data:any){
    console.log(data)
  }
  deleteTimLog(data:any){

  }
}
