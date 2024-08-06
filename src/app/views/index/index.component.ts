import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service'; 
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule , Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
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

  ) {
   
  }
   password:string="";
   email:string="";
   isLogin:boolean=true;


  ngOnInit(): void {
    this.testt();
    this.submit();
  }

  async testt() {
    console.log("Aaaaaaaaa")
  }
  async submit() {
    console.log("aaa")
    const data = {
       email: this.email,
       pass:this.password
    }
    // this.userService.loginAccount(data).subscribe((res: any) => {

    //   console.log(res)
    // }, (error) => {
    //   console.log(error)
    // })
  }
}
