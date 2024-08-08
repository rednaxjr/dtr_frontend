import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private storageService:StorageService,
  ) {

  }
  password: string = "";
  email: string = "";
  isLogin: boolean = true;


  ngOnInit(): void {
    this.testt();
  }

  async testt() {
    console.log("Aaaaaaaaa")
  }
  // async submit() {
  //   console.log("aaa")
  //   const data = {
  //      email: this.email,
  //      pass:this.password
  //   }
  //   this.userService.loginAccount(data).subscribe((res: any) => {

  //     this.authService.login
  //   }, (error) => {
  //     console.log(error)
  //   })
  // }

  async submit() {
    const data = {
      username: this.email,
      password: this.password
    } 
    this.authService.login(data).subscribe((res: any) => { 
      console.log(res)
      this.storageService.setItem('token', res.token);
      this.router.navigate(['/user/dashboard']);
    }, (error) => {
      console.log(error);
    }) 

  }
}
