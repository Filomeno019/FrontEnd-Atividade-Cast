import { tap } from 'rxjs';
import { MarcaService } from 'src/app/services/marca.service';
import { MatPaginator } from '@angular/material/paginator';
import { MarcaDataSource } from 'src/app/config/marca-data-source';
import { Marca } from './../../../../models/marca';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marca-search',
  templateUrl: './marca-search.component.html',
  styleUrls: ['./marca-search.component.css']
})
export class MarcaSearchComponent implements OnInit {

  marca: Marca[] = [];

  nome = "";

  displayedColumns: string[] = ['nome'];
  dataSource!: MarcaDataSource;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router : Router,
    private marcaService : MarcaService
     ) {}

  ngOnInit(): void {
    this.dataSource = new MarcaDataSource(this.marcaService);
    //this.dataSource.callingNewMethod();
  }

  ngAfterViewInit() {
    this.dataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();
 
    this.paginator.page
      .pipe(
        tap(() => this.callingNewMethod())
      )
      .subscribe();
  }

  cancel(): void{
    this.router.navigate(['marcas'])
    this.marcaService.message('Ação cancelada')
  }

  callingNewMethod() {
    this.dataSource.callingNewMethod(this.paginator.pageIndex, this.paginator.pageSize, this.nome);
    this.marcaService.message('Busca realizada com êxito')
  }

}
