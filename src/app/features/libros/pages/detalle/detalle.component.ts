import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosService } from 'src/app/core/services/libros.service';
import { Libro } from 'src/app/models/libro.model';

@Component({
  selector: 'app-detalle',
  standalone: false,
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  libro?: Libro;

  constructor(
    private route: ActivatedRoute,
    private librosService: LibrosService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.librosService.getById(id).subscribe({
        next: (data) => {
          this.libro = data;
        },
        error: () => {
          alert('Libro no encontrado');
        }
      });
    }
  }
}
