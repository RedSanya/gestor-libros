import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { LibrosRoutingModule } from './libros-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { GraficoComponent } from './pages/grafico/grafico.component';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent,
    DetalleComponent,
    GraficoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibrosRoutingModule,
    NgChartsModule,
    FormsModule
  ]
})
export class LibrosModule { }

