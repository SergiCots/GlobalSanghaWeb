import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, // Necesario para *ngIf, *ngFor, etc.
    ReactiveFormsModule, // Para formularios reactivos
    RouterModule // Para enrutamiento
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Corrige a styleUrls y en plural
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router: Router,) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.checkPasswords.bind(this) }); // Asegúrate de enlazar el contexto correcto
  }

  checkPasswords(group: FormGroup): { [key: string]: any } | null {
    let password = group.get('password')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { confirmPassword, ...userData } = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: (user) => {
          console.log('Registration successful', user);
          // Muestra el mensaje de éxito solo si el registro es exitoso
          alert('Registrado con éxito, verifica tu email');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.errorMessage = 'El registro ha fallado. Por favor, inténtelo de nuevo.';
          // Muestra el mensaje de error solo si ocurre un error
          alert(this.errorMessage);
        }
      });
    } else {
      console.log('Invalid form data');
      this.errorMessage = 'Por favor, rellene todos los campos correctamente.';
      // Considera mostrar este mensaje de una forma que no interrumpa al usuario,
      // como un texto de error en el formulario, en lugar de un alert.
    }
  }

}
