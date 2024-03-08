import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core'; // Importa importProvidersFrom

// Asegúrate de tener los componentes importados directamente si decides no usar carga perezosa
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/auth/login/login.component';
import { RegisterComponent } from './app/auth/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Agrega aquí más rutas según sea necesario
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule // Provee HttpClientModule para toda la aplicación
    ),
    // Aquí puedes añadir otros proveedores globales si es necesario, como servicios o tokens
  ]
}).catch(err => console.error(err));
