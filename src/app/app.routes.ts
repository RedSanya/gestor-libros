import { Routes } from '@angular/router';

export const routes: Routes = [
   { path: '', redirectTo: 'libros', pathMatch: 'full' },
   {
      path: 'libros',
      loadChildren: () =>
         import('./features/libros/libros.module').then(m => m.LibrosModule)
   }
];
