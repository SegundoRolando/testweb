import { Injectable } from '@angular/core';
import { libro } from '../domain/libro';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  lstlibro = new Array()
  private libColecction: AngularFirestoreCollection<libro>;
  constructor(private afs:AngularFirestore) { 
    this.libColecction = afs.collection<libro>('Libros');
  }

 /* addLibro(lib:libro){
    this.lstlibro.push(lib);
    console.log(this.lstlibro)
  }
  getLibros(){
    return this.lstlibro;
  }*/
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
}
