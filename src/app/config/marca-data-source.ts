import { MarcaService } from './../services/marca.service';
import { Marca } from './../models/marca';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';


export class MarcaDataSource implements DataSource<Marca>{

    private todoSubject = new BehaviorSubject<Marca[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

    constructor(private marcaService: MarcaService) { }
    
    connect(collectionViewer: CollectionViewer): Observable<readonly Marca[]> {
        return this.todoSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.todoSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    callingNewMethod(pageNumber = 0, pageSize = 5, nome= ''){
        this.loadingSubject.next(true);
        return this.marcaService.list({page: pageNumber, size: pageSize, nome:nome})
        .subscribe(result  => {
            this.todoSubject.next(result.content);
            this.countSubject.next(result.totalElements);
        })
      }

  

}
