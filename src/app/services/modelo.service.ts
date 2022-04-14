import { Modelo } from 'src/app/models/modelo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { API_CONFIG } from "./../../../../apiAtividade/src/app/config/api.config";
import { environment } from "./../../../../apiAtividade/src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ModeloService {
  
  constructor(private http: HttpClient, private Snack: MatSnackBar) {}

  baseUrl: String = environment.baseUrl;

  list(request: any): Observable<any> {
    const endpoint = API_CONFIG.baseUrl + "/modelo/findNew";
    const params = request;
    return this.http.get<any>(endpoint, { params });
  }

  create(modelo:{}): Observable<Modelo> {
    const url = this.baseUrl + "/modelo";
    return this.http.post<Modelo>(url, modelo);
  } 

  message(msg : String): void {
    this.Snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    })
  }
  

  delete(id : any): Observable<void> {
    const url = this.baseUrl + "/modelo/" + id;
    return this.http.delete<void>(url);
  }

  
  findById(id : any): Observable<Modelo> {
    return this.http.get<Modelo>(`${API_CONFIG.baseUrl}/modelo/${id}`)
  }

  findAll():Observable<Modelo[]> {
    const url = this.baseUrl + "/modelo/findAll";
    return this.http.get<Modelo[]>(url);
  }

  update(modelo: {}): Observable<Modelo> {
    const url = this.baseUrl + "/modelo";
    return this.http.put<Modelo>(url, modelo);
  }




  //create(modelo:{}): Observable<Modelo> {
//const url = this.baseUrl + "/modelo";
    //return this.http.post<Modelo>(url, modelo);
  //} 



}
