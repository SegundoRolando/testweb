import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { libro } from 'src/app/domain/libro';
import { LibroService } from 'src/app/sevice/libro.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  //lib: libro= new libro()
  lstlibro: any = new Array()
  libros: any
  constructor(private router: Router, private libroservice: LibroService ) { }

  ngOnInit(): void {
    this.loadlibros()
  }
  
  loadlibros(){
    this.libros = this.libroservice.getLibros();
    console.log(this.lstlibro)
  }
  
  editProduct(lib: libro){
    console.log("Editar Producto" + lib);
    let contador
    let param: NavigationExtras ={
      queryParams:{
        lib: lib,
        contador: 1,
      }
    }
    this.libroservice.update(lib)
    this.router.navigate(['libro/crear'], param)
  }

  eliminarProduct(lib: libro){
    this.libroservice.delete(lib)
    console.log("Vamos eliminar el producto", lib )
  } 

  gonewpage(){
    this.router.navigate(['libro/crear'])
  }

}
