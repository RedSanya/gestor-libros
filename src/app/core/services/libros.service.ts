import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Libro } from 'src/app/models/libro.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private baseUrl = 'https://68376df22c55e01d1849d1cc.mockapi.io/libros';
  // private baseUrl = 'https://mockapi.io/clone/68376df22c55e01d1849d1cd/libros';


  constructor(private http: HttpClient) { }

  getAll(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.baseUrl);
  }

  getById(id: string): Observable<Libro> {
    return this.http.get<Libro>(`${this.baseUrl}/${id}`);
  }

  create(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.baseUrl, libro);
  }

  update(id: string, libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.baseUrl}/${id}`, libro);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
