import { Veiculo } from '../../../../models/veiculo';
import { VeiculoService } from '../../../../services/veiculo.service';
import { ModeloService } from '../../../../services/modelo.service';
import { Modelo } from 'src/app/models/modelo';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class VeiculoDetalheResolver implements Resolve<Veiculo> {
    
    constructor(private veiculoService: VeiculoService) {}
    
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

            let id = route.params['id']
            return this.veiculoService.findById(id);
    }
}
