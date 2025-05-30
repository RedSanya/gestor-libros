import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { GraficoComponent } from './pages/grafico/grafico.component';

const routes: Routes = [
  { path: '', component: ListadoComponent },
  { path: 'nuevo', component: FormularioComponent },
  { path: 'editar/:id', component: FormularioComponent },
  { path: 'grafico', component: GraficoComponent },
  { path: ':id', component: DetalleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrosRoutingModule { }
