import { Component, OnInit } from '@angular/core';
import { LibrosService } from 'src/app/core/services/libros.service';
import { ChartConfiguration } from 'chart.js';
import { Libro } from 'src/app/models/libro.model';
import { BaseChartDirective } from 'ng2-charts';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-grafico',
  standalone: false,
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {
  chartConfig: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Libros por género',
        data: [],
        backgroundColor: ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#9C27B0']
      }]
    },
    options: {
      responsive: true
    }
  };

  constructor(private librosService: LibrosService) { }
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


  ngOnInit(): void {
    this.librosService.getAll().subscribe(libros => {
      const contador: Record<string, number> = {};

      libros.forEach(libro => {
        const genero = libro.genero?.trim() || 'Sin género';
        contador[genero] = (contador[genero] || 0) + 1;
      });

      this.chartConfig.data.labels = Object.keys(contador);
      this.chartConfig.data.datasets[0].data = Object.values(contador);

      // para que Chart.js actualice el gráfico
      this.chart?.update();
    });
  }

}

