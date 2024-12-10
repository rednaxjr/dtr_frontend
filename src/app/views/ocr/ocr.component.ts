import Tesseract from 'tesseract.js';
import { Component, OnInit } from '@angular/core';
 

import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-ocr',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatIconModule,],
  templateUrl: './ocr.component.html',
  styleUrl: './ocr.component.css'
})
export class OcrComponent implements OnInit {
  constructor( 
  ) {

  }
  text: any;
  worker: any;
  ngOnInit() {
  }
  PreviewImage:string="";


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const url: string = URL.createObjectURL(file);
      this.recognizeText(url)
 
      const reader = new FileReader();
      reader.onload = () => {
        this.PreviewImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async recognizeText(path: string) {
    const worker = await Tesseract.createWorker();
  
    const { data: { text } } = await worker.recognize(path);
    console.log(text);
    this.text = text;
    await worker.terminate();
  }
   
}