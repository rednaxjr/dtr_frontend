import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // url = environment.url;
  // header = environment.headers;
  url = "http://localhost:3000/api/user";
  headers = {
    headers: new HttpHeaders().set('Content-Type', "application/json")
  }
  constructor(
    private httpClient: HttpClient
  ) { }

  getAllUsers() {
    return this.httpClient.get(this.url + "/")
  }
  registerAccount(data: any) {
    return this.httpClient.post(this.url + "/insertData", data, this.headers)
  }
  updateUser(data: any) {
    return this.httpClient.post(this.url + "/updateById", data, this.headers)
  }
  
  deleteAccount(data: any) {
    return this.httpClient.post(this.url + "/deleteById/",data)
  }
  loginAccount(data:any){
    return this.httpClient.post(this.url + "/loginAccount/",data, this.headers)
  }
  // (){
  //   return this.httpClient.get()
  // }


}
