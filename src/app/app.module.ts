import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReservacionesComponent } from './content/reservaciones/reservaciones.component';
import { UsuariosComponent } from './content/usuarios/usuarios.component';
import { SalasComponent } from './content/salas/salas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReservacionesComponent,
    UsuariosComponent,
    SalasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
