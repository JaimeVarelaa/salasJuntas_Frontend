import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent implements OnInit {
  URL = 'http://localhost:3000/reservacion/';
  URLU = 'http://localhost:3000/usuarios/';
  URLS = 'http://localhost:3000/salas/';

  usuarios: any[] = [];
  salas: any[] = [];
  reservacion: any = {};
  form = false;
  spinner = false;
  invalido = false;

  dias: number[] = [];
  meses: { id: number, nombre: string }[] = [];
  anios: number[] = [];

  horasDisponibles: string[] = [];
  horarioBtn = false;

  constructor(private http: HttpClient, private router: Router) { }

  //crear reservación
  create(): void {
    this.spinner = true;
    if (this.reservacion.id_usuario.id &&
      this.reservacion.id_sala.id &&
      this.reservacion.anio &&
      this.reservacion.mes &&
      this.reservacion.dia &&
      this.reservacion.horainicial &&
      this.reservacion.duracion) {
      const formData = {
        usuario: this.reservacion.id_usuario.id,
        sala: this.reservacion.id_sala.id,
        Estado: 'Pendiente',
        Fecha: `${this.reservacion.anio}-${this.reservacion.mes}-${this.reservacion.dia}`,
        HoraInicio: this.reservacion.horainicial,
        HoraFinal: this.calcularHoraFinal(this.reservacion.horainicial, this.reservacion.duracion),
      };

      console.log(formData);

      this.http.post(this.URL, formData).subscribe(
        response => {
          console.log('Reservación creada con éxito:', response);
          this.form = false;
          this.spinner = false;
          window.location.reload();
        },
        error => {
          console.error('Error al crear la reservación:', error);
          this.spinner = false;
        }
      );
    } else {
      this.invalido = true;
      this.spinner = false;
    }
  }

  ngOnInit(): void {
    this.diasDisp();
    this.meseDisp();
    this.anioDisp();

    this.readU();
    this.readS();
  }

  //obtener usuarios
  readU(): void {
    this.spinner = true;

    this.http.get<any[]>(this.URLU).subscribe(
      response => {
        this.usuarios = response;
        //console.log('Usuarios cargados:', this.usuarios);
        this.spinner = false;
      },
      error => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  //obtener salas
  readS(): void {
    this.spinner = true;

    this.http.get<any[]>(this.URLS).subscribe(
      response => {
        this.salas = response;
        //console.log('Salas cargadas:', this.salas);
        this.spinner = false;
      },
      error => {
        console.error('Error al cargar salas:', error);
      }
    );
  }

  //calcular que días quedan
  private diasDisp(): void {
    const fechaActual = new Date();
    const ultimoDiaMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0).getDate();

    for (let i = fechaActual.getDate(); i <= ultimoDiaMesActual; i++) {
      this.dias.push(i);
    }
  }

  //calcular mes actual y siguiente
  private meseDisp(): void {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
    const siguienteMes = (mesActual + 1) % 12;

    this.meses.push({ id: mesActual + 1, nombre: this.nombreMes(mesActual) });
    this.meses.push({ id: siguienteMes + 1, nombre: this.nombreMes(siguienteMes) });
  }

  //obtener nombre de mes
  private nombreMes(indice: number): string {
    const meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[indice];
  }

    //calcular año actual y siguiente
  private anioDisp(): void {
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();
    const siguienteAño = añoActual + 1;

    this.anios.push(añoActual);
    this.anios.push(siguienteAño);
  }

  //verificar horarios disponibles
  horarios(usuario: string, sala: string, dia: number, mes: number, anio: number, nombreSala: string, nombreUsuario: string): void {
    this.spinner = true;
    this.invalido = false;
    //console.log(nombreSala);
    const fechaSeleccionada = this.formatoFecha(anio, mes, dia);
    //console.log('Fecha seleccionada:', fechaSeleccionada);
    const dechaFormat = new Date(anio, mes - 1, dia, 0, 0, 0, 0).toISOString();
    //console.log(dechaFormat);

    //obtener reservacios
    this.http.get<any[]>(`${this.URL}p`).subscribe(
      (reservaciones: any[]) => {
        //console.log('Reservaciones obtenidas:', reservaciones);
        const reservacionesFiltradas = reservaciones.filter(
          reservacion => {
            //filtrar pos fecha y sala
            return reservacion.fecha === dechaFormat && reservacion.sala === nombreSala;
          }
        );
        //console.log('Reservaciones filtradas:', reservacionesFiltradas);
        const horasDisponibles = Array.from({ length: 15 }, (_, index) => index + 8).map(hour => `${hour}:00:00`);
        const horasOcupadas: string[] = [];
        reservacionesFiltradas.forEach(reservacion => {
          const horaInicio = reservacion.horainicio.split(':')[0];
          const horaFinal = reservacion.horafinal.split(':')[0];
          for (let i = parseInt(horaInicio); i < parseInt(horaFinal); i++) {
            horasOcupadas.push(`${i}:00:00`);
          }
        });

        //console.log('Horas ocupadas:', horasOcupadas);
        this.horasDisponibles = horasDisponibles.filter(hora => !horasOcupadas.includes(hora));
        //console.log('Horas disponibles:', this.horasDisponibles);
        this.horarioBtn = true;
        this.spinner = false;
      },
      error => {
        console.error('Error al obtener los horarios disponibles:', error);
        this.spinner = false;
      }
    );
  }

  //dar formato a la fecha
  formatoFecha(anio: number, mes: number, dia: number): string {
    const diaStr = dia < 10 ? '0' + dia : dia.toString();
    return `${anio}-${mes}-${diaStr}`;
  }


  //calcular la hora final
  calcularHoraFinal(horaInicio: string, duracion: number): string {
    const [horaInicioHours, horaInicioMinutes, horaInicioSeconds] = horaInicio.split(":").map(Number);
    let totalMinutes = (horaInicioHours * 60 + horaInicioMinutes + duracion * 60) % (24 * 60);
    const horaFinalHours = Math.floor(totalMinutes / 60);
    const horaFinalMinutes = totalMinutes % 60;
    const horaFinalString = `${horaFinalHours.toString().padStart(2, '0')}:${horaFinalMinutes.toString().padStart(2, '0')}`;

    //console.log('inicio', horaInicio);
    //console.log('duración', duracion);
    //console.log('final', horaFinalString);
    return horaFinalString;
  }


  cancelar() {
    this.form = false;
    this.horarioBtn = false;
    this.invalido = false;
    this.reservacion = {};
  }
}
