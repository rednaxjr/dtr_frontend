import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-index-layout',
  standalone: true,
  imports: [RouterModule,],
  templateUrl: './index-layout.component.html',
  styleUrl: './index-layout.component.css'
})
export class IndexLayoutComponent {
  indexBG= '~/src/assets/img/background.jpg';
}
