// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule // Asegúrate de que AppRoutingModule esté en la sección de imports
    // ... otros módulos que puedas necesitar
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
