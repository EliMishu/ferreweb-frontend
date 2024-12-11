import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { CotizacionRequest } from '../models/cotizacion-req.model';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private apiUrl = environment.apiUrl + "/cotizaciones";

  constructor(private http: HttpClient) { }

  solicitarCotizaciones(request: CotizacionRequest): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/cotizacion`, request, { responseType: 'text' as 'json'});
  }
}
