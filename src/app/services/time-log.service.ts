import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class TimeLogService {

  url = "http://localhost:3000/api/time_log";
  headers = {
    headers: new HttpHeaders().set('Content-Type', "application/json")
  }
  constructor(
    private httpClient: HttpClient
  ) { }

  addLog(data: any) {
    return this.httpClient.post(this.url + "/addTimeLog/",data)
  }

  addLogManually(data: any) {
    return this.httpClient.post(this.url + "/addTimeLog2/",data)
  }
  updateLog(data: any) {
    return this.httpClient.post(this.url + "/updateTimeLog/",data)
  }
  deleteLog(data: any) {
    return this.httpClient.post(this.url + "/deleteTimeLog/",data)
  }

}
