import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormsModule, FormControl, FormGroup,  } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';
import {MatPaginatorModule, MatPaginator,  } from '@angular/material/paginator';
import {MatTableModule, MatTableDataSource,  } from '@angular/material/table';
import { TableComponent } from "../../../component/table/table/table.component";
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
    private authService: AuthService,
    private storageService:StorageService,
  ) {

  }
  users:any=[];
  ngOnInit(): void {
    this.getAllUsers()
  }
  async getAllUsers() {
    console.log("aaa")
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
 
}
