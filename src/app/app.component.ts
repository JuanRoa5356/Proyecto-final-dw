import { Component, OnInit } from '@angular/core';
import { Usuario } from './Models/Usuario.interface';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  productos: any[]= [];
  producto= {
    id: null as number | null,
    nombre: " ",
    descripcion: " ",
    precio: null,
    cantStock:null,
    codigoProd:null
  }
  private currentId: number = 1; 
  constructor(private appService: AppService){


  }
  ngOnInit(): void {
   this.getAll();
  }

getAll(){
  this.appService.getAll()
  .subscribe((data:any) => this.productos = data);
}

save() {
  if (this.producto.id) {
    this.producto.id = this.currentId; 
    this.currentId; 
    this.appService.update(this.producto.id!.toString(), this.producto)
      .subscribe(() => this.getAll());
  } else {
    this.producto.id = this.currentId; 
    this.currentId++; 

    this.appService.create(this.producto)
      .subscribe(() => this.getAll());
  }

  

  this.producto = {
    id: null as number | null,
    nombre: "", 
    descripcion: "", 
    precio: null,
    cantStock: null,
    codigoProd: null
  };
}

  edit(producto: any) {
    this. producto = {
      ... producto
    }
  }

  delete(producto: any) {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el producto "${producto.Nombre}"?`)) {
      this.appService.delete(producto.id.toString())
        .subscribe(() => {
          this.productos = this.productos.filter(p => p.id !== producto.id);
          alert('¡Producto eliminado! Recargue la página para visualizar los cambios.');
        }, (error) => {
          console.error("error al eliminar el producto: ", error);
          alert('¡Producto eliminado! Recargue la página para visualizar los cambios.');
        });
    }
  }


}


// 
/*
  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = { id: 0, nombre: '', email: '', empresa: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').subscribe(data => {
      this.usuarios = data.map(user => ({
        id: user.id,
        nombre: user.name,
        email: user.email,
        empresa: user.company.name
      }));
    });
  }

  agregarUsuario() {
    const body = {
      id: this.nuevoUsuario.id,
      name: this.nuevoUsuario.nombre,
      email: this.nuevoUsuario.email,
      company: {
        name: this.nuevoUsuario.empresa
      }
    };

    this.http.post('https://jsonplaceholder.typicode.com/users', body).subscribe(response => {
      console.log('Usuario Agregado', response);
      this.usuarios.push(this.nuevoUsuario);
      this.nuevoUsuario = { id: 0, nombre: '', email: '', empresa: '' };
    });
  }

  eliminarFila(id: number) {
    this.http.delete(`https://jsonplaceholder.typicode.com/users/${id}`).subscribe(response => {
      this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
      alert('Usuario eliminado correctamente');
    }, error => {
      console.error('Error al eliminar el usuario:', error);
      alert('Error al eliminar el usuario');
    });
  }

  actualizarUsuario() {
    const body = {
      id: this.nuevoUsuario.id,
      name: this.nuevoUsuario.nombre,
      email: this.nuevoUsuario.email,
      company: {
        name: this.nuevoUsuario.empresa
      }
    };

    this.http.put(`https://jsonplaceholder.typicode.com/users/${this.nuevoUsuario.id}`, body)
      .subscribe(response => {
        console.log('Usuario actualizado', response);
        const index = this.usuarios.findIndex(usuario => usuario.id === this.nuevoUsuario.id);
        if (index !== -1) {
          this.usuarios[index] = { ...this.nuevoUsuario };
        }
        this.cancelarEdicion();
      }, error => {
        console.error('Error al actualizar el usuario:', error);
        alert('Error al actualizar el usuario');
      });
  }

  editarUsuario(usuario: Usuario) {
    this.nuevoUsuario = { ...usuario }; // Carga el usuario seleccionado para editar
  }

  cancelarEdicion() {
    this.nuevoUsuario = { id: 0, nombre: '', email: '', empresa: '' }; // Reinicia el formulario
  }*/