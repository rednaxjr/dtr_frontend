import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
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
  selector: 'app-confirmation',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule, FormsModule, MatTableModule, MatPaginatorModule, MatDialogModule, MatButtonModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  @Output() confirmAction = new EventEmitter<any>();
  date: any | null = null;
  time: any | null = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmationComponent>,
    private storageService: StorageService,
    private userService: UserService,
    private timeLogService: TimeLogService
  ) { }
  title: string = "";

  ngOnInit() {

  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  confirm() {
    const data = {
      id: this.data.id
    }
    // this.timeLogService.deleteLog(data).subscribe(
    //   (res: any) => {
    //     console.log(res.message)
    //   }, (error) => {
    //     console.error('Error fetching time logs:', error);
    //   }
    // );
    this.confirmAction.emit({ type: this.data.type, data: data });
    this.dialogRef.close();

  }
}
