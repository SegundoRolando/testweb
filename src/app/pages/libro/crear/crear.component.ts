import { Component, OnInit } from '@angular/core';
import { libro } from 'src/app/domain/libro';
import { Router } from '@angular/router';
import { LibroService } from 'src/app/sevice/libro.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

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

}
