import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-completado',
  templateUrl: './completado.component.html',
  styleUrls: ['./completado.component.css'],
  providers: [DatePipe]
})
export class CompletadoComponent implements OnInit {
  URL = 'http://localhost:3000/reservacion/c';

  completados: any[] = [];
  completado: any = {};

  spinner = true;

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.read();
  }

  read(): void {
    this.spinner = true;

    this.http.get<any[]>(this.URL).subscribe(
      response => {
        this.completados = response;
        console.log(this.completados);
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
}
