import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservacionesComponent } from './content/reservaciones/reservaciones.component';
import { UsuariosComponent } from './content/usuarios/usuarios.component';
import { SalasComponent } from './content/salas/salas.component';

const routes: Routes = [
  { path: 'reservaciones', component: ReservacionesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'salas', component: SalasComponent },
  { path: '', redirectTo: '/reservaciones', pathMatch: 'full' },
  { path: '**', redirectTo: '/reservaciones', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
