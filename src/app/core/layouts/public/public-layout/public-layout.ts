import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../components/header-component/header-component";
import { NavbarComponent } from "../components/navbar-component/navbar-component";
import { FooterComponent } from "../components/footer-component/footer-component";

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet,HeaderComponent, NavbarComponent, FooterComponent],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {}
