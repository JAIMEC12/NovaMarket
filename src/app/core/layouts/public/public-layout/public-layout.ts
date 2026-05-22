import { Component } from '@angular/core';
import { HeaderComponent } from "../components/header-component/header-component";

@Component({
  selector: 'app-public-layout',
  imports: [HeaderComponent],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {}
