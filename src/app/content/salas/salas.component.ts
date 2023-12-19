import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {
  URL = 'http://localhost:3000/salas/';

  salas: any[] = [];
  sala: any = {};
  imagen = '';
  sendImagen = '';

  form = false;
  spinner = true;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.read();
  }

  read(): void {
    this.spinner = true;

    this.http.get<any[]>(this.URL).subscribe(
      response => {
        this.salas = response;
        //console.log(this.salas)
        this.spinner = false;
      },
      error => {

      }
    )
  }

  select(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.sendImagen = file;
      this.imagen = URL.createObjectURL(file);
    }
  }

  create(): void {
    this.spinner = true;

    let formData = new FormData();
    formData.append('nombre', this.sala.Nombre);
    formData.append('file', this.sendImagen);
    this.http.post(this.URL, formData).subscribe(
      response => {
        console.log(response);
        window.location.reload();
      }
    );
  }


  updatef(sala: any) {
    this.sala = { ...sala };
    this.sendImagen = 'http://localhost:3000/' + sala.Foto;
    this.form = true;
  }

  update() {
    this.spinner = true;

    let formData = new FormData();
    formData.append('nombre', this.sala.Nombre);
    formData.append('file', this.sendImagen);

    this.http.put(this.URL + this.sala.id, formData).subscribe(
      response => {
        this.sala = {};
        window.location.reload();
      },
      error => {

      }
    )
  }

  delete(sala: any) {
    this.spinner = true;

    this.http.delete(this.URL + sala.id).subscribe(
      response => {
        window.location.reload();
      },
      error => {

      }
    )
  }

  cancelar() {
    this.form = false;
    this.sala = {};
  }
}
