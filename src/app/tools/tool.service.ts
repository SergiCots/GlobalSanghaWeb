// tool.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tool } from '../model/tool.model';
import {AuthService} from "../auth/auth.service";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private apiUrl = 'http://localhost:8080/api/tools';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No hay nada')
      return {};
    }
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }


  // Obtener todas las herramientas del usuario actual
  getUserTools(): Observable<any[]> {
    const currentUser = this.authService.currentUserValue;
    if(currentUser && currentUser.id) {
      return this.http.get<any[]>(`${this.apiUrl}/user/${currentUser.id}`, this.getHttpOptions());
    } else {
      console.error('Usuario no logueado. Por favor, loguéate de nuevo.');
      return throwError(() => new Error('Usuario no logueado. Por favor, loguéate de nuevo.'));
    }

  }


  addTool(tool: Tool): Observable<boolean> {
    const currentUser = this.authService.currentUserValue;
    if (currentUser != null && currentUser.id) {
      tool.owner = currentUser;
      return this.http.post<boolean>(`${this.apiUrl}/`, tool, this.getHttpOptions());
    } else {
      console.error('Usuario no logueado o herramienta inválida. Por favor, verifica.');
      return throwError(() => new Error('Usuario no logueado o herramienta inválida.'));
    }
  }



  // Actualizar una herramienta existente
  updateTool(toolId: number, tool: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${toolId}`, tool);
  }

  // Eliminar una herramienta
  deleteTool(toolId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${toolId}`);
  }
}
