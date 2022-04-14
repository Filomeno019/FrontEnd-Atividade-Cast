import { Marca } from './../models/marca';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { API_CONFIG } from "./../../../../apiAtividade/src/app/config/api.config";
import { environment } from "./../../../../apiAtividade/src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MarcaService {
  
  constructor(private http: HttpClient, private Snack: MatSnackBar) {}

  baseUrl: String = environment.baseUrl;

  list(request: any): Observable<any> {
    const endpoint = API_CONFIG.baseUrl + "/marca/findNew";
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

  create(marca:Marca): Observable<Marca> {
    const url = this.baseUrl + "/marca";
    return this.http.post<Marca>(url, marca);
  } 
  
  findById(id : any): Observable<Marca> {
    return this.http.get<Marca>(`${API_CONFIG.baseUrl}/marca/${id}`)
  }

  delete(id : any): Observable<void> {
    const url = this.baseUrl + "/marca/" + id;
    return this.http.delete<void>(url);
  }

  update(marca: Marca): Observable<Marca> {
    const url = this.baseUrl + "/marca";
    return this.http.put<Marca>(url, marca);
  }

  findAll():Observable<Marca[]> {
    const url = this.baseUrl + "/marca/findAll";
    return this.http.get<Marca[]>(url);
  }

}
