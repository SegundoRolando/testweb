import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './pages/libro/crear/crear.component';
import { ListarComponent } from './pages/libro/listar/listar.component';


const routes: Routes = [
  {path:"libro/crear", component:CrearComponent},
  {path:"libro/listar",component:ListarComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
