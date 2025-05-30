import { Component, OnInit } from '@angular/core';
import { LibrosService } from 'src/app/core/services/libros.service';
import { Libro } from 'src/app/models/libro.model';

@Component({
  selector: 'app-listado',
  standalone: false,
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  libros: Libro[] = [];
  cargando = true;
  busqueda: string = '';

  // VARIABLES PARA PAGINACION
  page = 1; // página actual
  pageSize = 9;// libros por página

  constructor(private librosService: LibrosService) { }

  ngOnInit(): void {
    this.librosService.getAll().subscribe({
      next: (data) => {
        console.log('Libros cargados:', data); //Verificación
        this.libros = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar libros:', err); //Si hay error
        this.cargando = false;
      }
    });
  }

  // TOTAL DE PÁGINAS
  get totalPages(): number {
    return Math.ceil(this.librosFiltrados.length / this.pageSize);
  }

  // ARRAY DE NÚMEROS DE PÁGINA
  get pages(): number[] {
    const total = this.totalPages;
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, this.page - half);
    let end = start + maxVisible - 1;

    if (end > total) {
      end = total;
      start = Math.max(1, end - maxVisible + 1);
    }

    const result: number[] = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }

  // LIBROS QUE SE MUESTRAN AHORA
  get librosPaginados(): Libro[] {
    const start = (this.page - 1) * this.pageSize;
    return this.librosFiltrados.slice(start, start + this.pageSize);
  }

  // CAMBIAR PÁGINA
  cambiarPagina(n: number): void {
    if (n < 1 || n > this.totalPages) return;
    this.page = n;
  }

  // FILTRO DE BUSQUEDA
  get librosFiltrados(): Libro[] {
    const term = this.busqueda.trim().toLowerCase();
    return term
      ? this.libros.filter(l => l.titulo.toLowerCase().includes(term))
      : this.libros;
  }

  //ELIMINAR LIBRO
  eliminarLibro(id: string): void {
    if (!confirm('¿Eliminar este libro?')) return;
    this.librosService.delete(id).subscribe(() => {
      this.libros = this.libros.filter(l => l.id !== id);
      // Ajustamos página si eliminamos el último ítem de la última página
      if (this.page > this.totalPages) {
        this.page = this.totalPages;
      }
    });
  }
  // 
}
