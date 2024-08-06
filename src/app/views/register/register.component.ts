import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registrationForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repass: new FormControl('', [Validators.required]),
  });
  constructor(
    private router: Router,
    private userService: UserService,

  ) {

  }

  ngOnInit(): void {

  }

  async testt() {

  }
  async submit() {
    console.log("aaa")
    const data = {
      name: "Sample"
    }
    this.userService.getAllUsers().subscribe((res: any) => {

      console.log(res)
    }, (error) => {
      console.log(error)
    })
  }
  async handleSubmit() {

    if (this.registrationForm.value.fname == "" || this.registrationForm.value.fname == null) {
      alert("Please Enter your First Name")
    } else if (this.registrationForm.value.lname == "" || this.registrationForm.value.lname == null) {
      alert("Please Enter your Last Name")
    } else if (this.registrationForm.value.email == "" || this.registrationForm.value.email == null) {
      alert("Please Enter your Email Address")
    } else if (this.registrationForm.value.password == "" || this.registrationForm.value.password == null) {
      alert("Enter your password")
    } else if (this.registrationForm.value.repass == "" || this.registrationForm.value.repass == null) {
      alert("Enter Re type password")
    } else if (this.registrationForm.value.repass != this.registrationForm.value.password) {
      alert("Password didnt match")
    } else {
      const data = {
        fname: this.registrationForm.value.fname,
        lname: this.registrationForm.value.lname,
        email: this.registrationForm.value.email,
        pass: this.registrationForm.value.password,
        repass: this.registrationForm.value.repass,
      }
      console.log(data)
      this.userService.registerAccount(data).subscribe((res: any) => {
        alert("Account Registered");
        window.location.reload();
        // this.registrationForm.value.fname = ""
        // this.registrationForm.value.lname = ""
        // this.registrationForm.value.email = ""
        // this.registrationForm.value.password = ""
        // this.registrationForm.value.repass = ""
        console.log(res)
      }, (error) => {
        console.log(error)
      })
    }

    // alert( 
    //   this.registrationForm.value.name + ' | ' + this.registrationForm.value.email
    // );
  }
}
