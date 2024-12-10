import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StorageService } from '../../../services/storage.service';
import { UserService } from '../../../services/user.service';
import { TimeLogService } from '../../../services/time-log.service';


@Component({
  selector: 'app-add-time',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule, FormsModule, MatTableModule, MatPaginatorModule, AddTimeComponent, MatDialogModule, MatButtonModule],
  templateUrl: './add-time.component.html',
  styleUrl: './add-time.component.css'
})
export class AddTimeComponent {
  date: any | null = null;
  time: any | null = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddTimeComponent>,
    private storageService: StorageService,
    private userService: UserService,
    private timeLogService: TimeLogService
  ) { }
  title: string = "";

  ngOnInit() {
    if (this.data.date.length == 1) {
      this.date = this.data.date[0];
      this.time = this.data.time;
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  submit() {
    const user = this.storageService.getDecodedToken('token');
    const date_time = `${this.date}T${this.time}:00`; 
    const data = {   id: user.id,  date_time: date_time,
    };
    if (this.data.title == "Add") {
      this.timeLogService.addLogManually(data).subscribe(
        (res: any) => {
          console.log(res.message)
        }, (error) => {
          console.error('Error fetching time logs:', error);
        }
      );
    } else {
      const data = { id: this.data.id,   date_time: date_time,  }; 
      this.timeLogService.updateLog(data).subscribe(
        (res: any) => {
          console.log(res.message)
        }, (error) => {
          console.error('Error fetching time logs:', error);
        }
      );
    } 
  }
}
