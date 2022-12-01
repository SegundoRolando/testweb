<h1>servicios</h1> 
 
 lstlibro = new Array()
  private libColecction: AngularFirestoreCollection<libro>;
  constructor(private afs:AngularFirestore) { 
    this.libColecction = afs.collection<libro>('Libros');
  }
  
 add(lib: libro){
    const id = this.afs.createId();
    lib.uid= id;
    this.libColecction.doc(id).set(Object.assign({},lib));
  }
  
  getLibros(){
    return this.libColecction.valueChanges();
    }
  
  update(lib: libro){
    let id = lib.uid;
    this.libColecction.doc(id).update(Object.assign({},lib));
  }
  
  delete(lib: libro){
    this.libColecction.doc<libro>(lib.uid).delete();
    //removed: this.libColecction;
  }
 <h1>App.Modules</h1> 
 import { FIREBASE_OPTIONS } from '@angular/fire/compat';
 
 import[FormsModule,]
 
 providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase}],
  <h1>app-roting</h1> 
 
 import { CrearComponent } from './pages/libro/crear/crear.component';
import { ListarComponent } from './pages/libro/listar/listar.component';

 const routes: Routes = [
  {path:"libro/crear", component:CrearComponent},
  {path:"libro/listar",component:ListarComponent}
];
 <h1>componet.listar</h1> 

import { Router } from '@angular/router';
import { LibroService } from 'src/app/sevice/libro.service';
 
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
 
 <h1>componet.crear</h1> 
 
import { Router } from '@angular/router';
import { LibroService } from 'src/app/sevice/libro.service';
 
lib: libro= new libro()
  cont = 0
  constructor(private router: Router, private libroService: LibroService) {
    let params = this.router.getCurrentNavigation()?.extras.queryParams;
    if(params){
      this.lib = params['lib']; 
      this.cont=params['cont'];
    }
   }

  ngOnInit(): void {
  }
  guardar(){
    console.log(this.lib)
    if(this.cont=0){
      this.libroService.add(this.lib)
    }else{  
      this.libroService.update(this.lib)
    }
    this.lib =new libro()
  }
  gonewpage(){
    this.router.navigate(['libro/listar'])
  }
 <h1>domain</h1>
 
 export class Libro{
    uid?: string;
    codigo?: string;
    nombre?: string;
    autor?: string;
}
  <h1>HTM CREAR</h1>
 <p>Formulario Crear</p>
<form action="">
    <label for="txtcodigo">Codigo</label>
    <input id="txtcodigo" name="txtcodigo" [(ngModel)]="lib.codigo"/> <br/>
    <label for="txtnombre">Nombre</label>
    <input id="txtnombre" name="txtnombre" [(ngModel)]="lib.nombre"/><br/>
    <label for="txtautor">Autor</label>
    <input id="txtautor" name="txtautor" [(ngModel)]="lib.autor"/><br/>
    <button (click)="guardar()">Guardar</button>
    
</form>
<button (click)="gonewpage()">ListarProductos</button>
 <h1>HTM Listar</h1>
 <p>listado</p>
<p>Formulario para crear Productos</p> <button (click)="gonewpage()">Nuevo Producto</button>

<table>
    <tr>
        <th>Codigo</th>
        <th>Nombre</th>
        <th>Autor</th>
        <th>Acciones</th>
    </tr>
    <tr *ngFor="let l of  libros | async">
        <td>{{l.codigo}}</td>
        <td>{{l.nombre}}</td>
        <td>{{l.autor}}</td>
        <td><button (click)="editProduct(l)">Editar</button></td>
        <td><button (click)="eliminarProduct(l)">Eliminar</button></td> 
    </tr>
</table>


 
