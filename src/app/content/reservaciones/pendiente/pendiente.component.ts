import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pendiente',
  templateUrl: './pendiente.component.html',
  styleUrls: ['./pendiente.component.css'],
  providers: [DatePipe]
})
export class PendienteComponent implements OnInit {
  URL = 'http://localhost:3000/reservacion/p';
  URLG = 'http://localhost:3000/reservacion/';

  pendientes: any[] = [];
  pendiente: any = {};

  spinner = true;

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.read();
  }

  read(): void {
    this.spinner = true;

    this.http.get<any[]>(this.URL).subscribe(
      response => {
        this.pendientes = response;
        console.log(this.pendientes);
        this.spinner = false;
      }
    );
  }

  formaFecha(fecha: string): string {
    const fechaF = this.datePipe.transform(fecha, 'dd/MM/yyyy');
    return `${fechaF}`;
  }

  formatHora(hora: string): string {
    //sólo para que retorne la hora
    const fecha = '2023-01-01';
    const horaF = this.datePipe.transform(`${fecha} ${hora}`, 'HH:mm');

    return `${horaF}`;
  }


  cancelar(id: number) {
    this.spinner = true;

    this.http.put(this.URLG + 'cancel/' + id, null).subscribe(
      response => {
        this.spinner = false;
        window.location.reload();
      },
      error => {
        console.error('Error al cancelar la reservación:', error);
        this.spinner = false;
      }
    );
  }

  completar(id: number) {
    this.spinner = true;

    this.http.put(this.URLG + 'complete/' + id, null).subscribe(
      response => {
        this.spinner = false;
        window.location.reload();
      },
      error => {
        console.error('Error al cancelar la reservación:', error);
        this.spinner = false;
      }
    );
  }

}
