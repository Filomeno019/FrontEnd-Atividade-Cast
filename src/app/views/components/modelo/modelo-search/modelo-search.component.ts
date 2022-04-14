import { ModeloDataSource } from './../../../../config/modelo-data-source';
import { ModeloService } from './../../../../services/modelo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { MarcaService } from 'src/app/services/marca.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Marca } from './../../../../models/marca';
import { Modelo } from 'src/app/models/modelo';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modelo-search',
  templateUrl: './modelo-search.component.html',
  styleUrls: ['./modelo-search.component.css']
})
export class ModeloSearchComponent implements OnInit {

  modelo: Modelo = new Modelo;
    
  marcas: Marca[] = [];

  idMarca: any;
  nomeModelo: any;

  formulario!: FormGroup;

  displayedColumns: string[] = ['nomeMarca','nome'];
  dataSource!: ModeloDataSource;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router : Router,
    private modeloService : ModeloService,
    private marcaService: MarcaService,
    private formBuilder: FormBuilder
     ) {}

  ngOnInit(): void {
    this.findAll();
    this.dataSource = new ModeloDataSource(this.modeloService);
    this.formulario = this.formBuilder.group({
      id:[null],
      nome:[null],
      marca:[null]
    })
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
    this.router.navigate(['modelos'])
    this.modeloService.message('Ação cancelada')
  }

  callingNewMethod() {
    this.dataSource.callingNewMethod(this.paginator.pageIndex, this.paginator.pageSize, this.nomeModelo, this.idMarca);
    this.modeloService.message('Busca realizada com êxito')
  }

  findAll():void{
    this.marcaService.findAll().subscribe((resposta) =>{
      this.marcas = resposta;
    })
  }

}
