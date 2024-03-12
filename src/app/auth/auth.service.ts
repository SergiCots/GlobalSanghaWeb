import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private authUrl = 'http://localhost:8080/api/users'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient, private router: Router) {
    const currentUserJson = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(currentUserJson ? JSON.parse(currentUserJson) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, { email, password }).pipe(
      map(response => {
        console.log(response);
        if (response && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', response.token); // Almacenar el token aquí
          this.currentUserSubject.next(response.user); // Actualiza correctamente el BehaviorSubject
        }
        return response;
      })
    );
  }


  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/register`, user);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null); // Notifica a los observadores que el usuario ha cerrado sesión
    // Opcional: Redirigir al usuario al login o a la página principal después del logout
  }

  redirectToLogin() {
    this.router.navigate(['/login']); // Ajusta '/login' a la ruta de tu página de inicio de sesión
  }
}
