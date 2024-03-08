import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Usa RouterModule si necesitas enlaces de rutas
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule, // Añade CommonModule para *ngIf
    RouterModule // Añade RouterModule si usas enlaces de ruta en la plantilla
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrige a 'styleUrls' (es plural)
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = ''; // Para almacenar y mostrar mensajes de error

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router // Inyecta el Router para redireccionar
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (response) => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = 'Error de autenticación. Verifique sus credenciales.';
        }
      });
    } else {
      this.errorMessage = 'Por favor, rellene todos los campos correctamente.';
    }
  }


}
