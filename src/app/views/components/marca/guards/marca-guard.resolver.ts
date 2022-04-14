import { MarcaService } from 'src/app/services/marca.service';
import { Marca } from './../../../../models/marca';
import { ModeloService } from '../../../../services/modelo.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class MarcaDetalheResolver implements Resolve<Marca> {
    
    constructor(private marcaService: MarcaService) {}

    resolve(

        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

            let id = route.params['id']

            return this.marcaService.findById(id);
    }
}
