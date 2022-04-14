import { ModeloService } from './../../../../services/modelo.service';
import { Modelo } from 'src/app/models/modelo';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class ModeloDetalheResolver implements Resolve<Modelo> {
    
    constructor(private modeloService: ModeloService) {}
    
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

            let id = route.params['id']

            return this.modeloService.findById(id);
            
    }
}
