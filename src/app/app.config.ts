import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import {AppRoutingModule, routes} from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule // Asegúrate de importar ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};

