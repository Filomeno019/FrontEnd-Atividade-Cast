import { Veiculo } from 'src/app/models/veiculo';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { VeiculoService } from '../services/veiculo.service';


export class VeiculoDataSource implements DataSource<Veiculo>{

    private todoSubject = new BehaviorSubject<Veiculo[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

    constructor(private veiculoService: VeiculoService) { }
    
    connect(collectionViewer: CollectionViewer): Observable<readonly Veiculo[]> {
        return this.todoSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.todoSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    callingNewMethod(idMarca = '', idModelo = '', valorDe = '', valorAte = '', pageNumber = 0, pageSize = 5,){
        this.loadingSubject.next(true);
        return this.veiculoService.list({idMarca:idMarca, idModelo:idModelo, valorDe:valorDe, valorAte:valorAte, page: pageNumber, size: pageSize})
        .subscribe(result  => {
            this.todoSubject.next(result.content);
            this.countSubject.next(result.totalElements);
        })
      }
}
