import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosService } from 'src/app/core/services/libros.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro.model';

@Component({
  selector: 'app-formulario',
  standalone: false,
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})

export class FormularioComponent implements OnInit {
  formulario: FormGroup;
  libroId?: string;
  modoEdicion = false;

  constructor(
    private fb: FormBuilder,
    private librosService: LibrosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      genero: ['', Validators.required],
      publicado: ['', Validators.required],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
    this.libroId = this.route.snapshot.paramMap.get('id') ?? undefined;
    this.modoEdicion = !!this.libroId;

    if (this.modoEdicion && this.libroId) {
      this.librosService.getById(this.libroId).subscribe({
        next: (libro: Libro) => {
          this.formulario.patchValue(libro); // precarga datos
        },
        error: (err) => {
          console.error('Error al obtener libro', err);
          alert('No se pudo cargar el libro');
        }
      });
    }
  }

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datosLibro = this.formulario.value;

    if (this.modoEdicion && this.libroId) {
      this.librosService.update(this.libroId, datosLibro).subscribe({
        next: () => {
          alert('Libro actualizado correctamente');
          this.router.navigate(['/libros']);
        },
        error: (err) => {
          console.error('Error al actualizar libro', err);
        }
      });
    } else {
      this.librosService.create(datosLibro).subscribe({
        next: () => {
          alert('Libro creado correctamente');
          this.router.navigate(['/libros']);
        },
        error: (err) => {
          console.error('Error al crear libro', err);
        }
      });
    }
  }
}

