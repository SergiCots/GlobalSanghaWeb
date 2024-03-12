import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RouterModule } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import {ToolService} from "../tools/tool.service";
import { AddToolFormComponent } from "../tools/add-tool-form/add-tool-form.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, // Añade CommonModule a las importaciones
    RouterModule,
    AddToolFormComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrige a styleUrls
})
export class HomeComponent implements OnInit {
  welcomeMessage: string = '';
  userTools: any[] = [];
  showAddTool: boolean = true;

  constructor(
    private authService: AuthService,
    private toolService: ToolService // Inyecta el servicio de herramientas
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.welcomeMessage = `Bienvenido ${user.username}`;
        this.loadUserTools();
      } else {
        this.welcomeMessage = '';
      }
    });
  }

  loadUserTools() {
    this.toolService.getUserTools().subscribe({
      next: (tools) => {
        this.userTools = tools;
      },
      error: (e) => console.error(e)
    });
  }

  logout() {
    this.authService.logout();
  }

  addTool(toolData: any) {
    if(toolData){
      this.showAddTool = false;
      this.loadUserTools();
    } else {
      this.toolService.addTool(toolData).subscribe({
        next: (success) => {
          if (success) {
            // Aquí podrías recargar la lista de herramientas para incluir la nueva
            this.loadUserTools(); // Asumiendo que tienes un método para cargar las herramientas
          }
          this.showAddTool = true;
        },
        error: (error) => console.error('Error al añadir herramienta', error)
      });
    }

  }

}
