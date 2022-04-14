import { ModeloService } from './../services/modelo.service';
import { Modelo } from './../models/modelo';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';


export class ModeloDataSource implements DataSource<Modelo>{

    private todoSubject = new BehaviorSubject<Modelo[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

    constructor(private marcaService: ModeloService) { }
    
    connect(collectionViewer: CollectionViewer): Observable<readonly Modelo[]> {
        return this.todoSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.todoSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    callingNewMethod(pageNumber = 0, pageSize = 5, nome= '', id= ''){
        this.loadingSubject.next(true);
        return this.marcaService.list({page: pageNumber, size: pageSize, nome:nome, id:id})
        .subscribe(result  => {
            this.todoSubject.next(result.content);
            this.countSubject.next(result.totalElements);
        })
      }

  

}
