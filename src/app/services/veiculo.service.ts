import { Veiculo } from 'src/app/models/veiculo';

import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { API_CONFIG } from "./../../../../apiAtividade/src/app/config/api.config";
import { environment } from "./../../../../apiAtividade/src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class VeiculoService {
  
  constructor(private http: HttpClient, private Snack: MatSnackBar) {}

  baseUrl: String = environment.baseUrl;

  list(request: any): Observable<any> {
    const endpoint = API_CONFIG.baseUrl + "/veiculo/findNew";
    const params = request;
    return this.http.get<any>(endpoint, { params });
  }

  message(msg : String): void {
    this.Snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    })
  }

  create(veiculo:{}): Observable<Veiculo> {
    const url = this.baseUrl + "/veiculo";
    return this.http.post<Veiculo>(url, veiculo);
  } 


  delete(id : any): Observable<void> {
    const url = this.baseUrl + "/veiculo/" + id;
    return this.http.delete<void>(url);
  }

  findById(id : any): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${API_CONFIG.baseUrl}/veiculo/${id}`)
  }

  update(veiculo: {}): Observable<Veiculo> {
    const url = this.baseUrl + "/veiculo";
    return this.http.put<Veiculo>(url, veiculo);
  }




}
