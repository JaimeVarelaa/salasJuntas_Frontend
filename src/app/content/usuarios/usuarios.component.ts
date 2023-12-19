import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  URL = 'http://localhost:3000/usuarios/';

  usuarios: any[] = [];
  usuario: any = {
    Puesto: 'Empleado'
  };
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
        this.usuarios = response;
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
    formData.append('nombre', this.usuario.Nombre);
    formData.append('ApellidoP', this.usuario.ApellidoP);
    formData.append('ApellidoM', this.usuario.ApellidoM);
    formData.append('Puesto', this.usuario.Puesto);
    formData.append('file', this.sendImagen);
    this.http.post(this.URL, formData).subscribe(
      response => {
        console.log(response);
        window.location.reload();
      }
    );
  }


  updatef(usuario: any) {
    this.usuario = { ...usuario };
    this.sendImagen = 'http://localhost:3000/' + usuario.Foto;
    this.form = true;
  }

  update() {
    this.spinner = true;

    let formData = new FormData();
    formData.append('nombre', this.usuario.Nombre);
    formData.append('ApellidoP', this.usuario.ApellidoP);
    formData.append('ApellidoM', this.usuario.ApellidoM);
    formData.append('Puesto', this.usuario.Puesto);
    formData.append('file', this.sendImagen);

    this.http.put(this.URL + this.usuario.id, formData).subscribe(
      response => {
        this.usuario = {};
        window.location.reload();
      },
      error => {

      }
    )
  }

  delete(usuario: any) {
    this.spinner = true;

    this.http.delete(this.URL + usuario.id).subscribe(
      response => {
        window.location.reload();
      },
      error => {

      }
    )
  }

  cancelar() {
    this.form = false;
    this.usuario = {};
  }
}
