import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RouterModule } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, // Añade CommonModule a las importaciones
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrige a styleUrls
})
export class HomeComponent implements OnInit {
  welcomeMessage: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.welcomeMessage = `Bienvenido ${user.username}`;
      } else {
        this.welcomeMessage = '';
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
