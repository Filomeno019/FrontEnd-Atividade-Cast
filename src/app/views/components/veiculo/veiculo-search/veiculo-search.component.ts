import { MarcaService } from 'src/app/services/marca.service';
import { Marca } from './../../../../models/marca';
import { tap } from 'rxjs';
import { VeiculoService } from './../../../../services/veiculo.service';
import { VeiculoDataSource } from './../../../../config/veiculo-data-source';
import { ModeloService } from './../../../../services/modelo.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Modelo } from './../../../../models/modelo';
import { Veiculo } from './../../../../models/veiculo';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-veiculo-search',
  templateUrl: './veiculo-search.component.html',
  styleUrls: ['./veiculo-search.component.css']
})
export class VeiculoSearchComponent implements OnInit {

  veiculo: Veiculo = new Veiculo;
    
  modelos: Modelo[] = [];
  marcas: Marca[] = [];

  idModelo: any;
  idMarca: any;
  valorDe: any ;
  valorAte: any;

  formulario!: FormGroup;

  displayedColumns: string[] = ['nomeModelo','valor'];
  dataSource!: VeiculoDataSource;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router : Router,
    private service : ModeloService,
    private veiculoService: VeiculoService,
    private modeloService: ModeloService,
    private marcaService: MarcaService,
    private formBuilder: FormBuilder
     ) {}

  ngOnInit(): void {
    this.findAllmarca();
    this.findAllmodelo();
    this.dataSource = new VeiculoDataSource(this.veiculoService);
    this.formulario = this.formBuilder.group({
      id:[null],
      nome:[null],
      marca:[null],
      modelo:[null],
      valorDe:[null],
      valorAte:[null],
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
    this.router.navigate(['veiculos'])
    this.service.message('Ação Cancelada')
  }

  callingNewMethod() {
     this.dataSource.callingNewMethod(this.idMarca, this.idModelo, this.valorDe, this.valorAte, this.paginator.pageIndex, this.paginator.pageSize);
    this.service.message('Busca realizada com êxito')
  }

  findAllmodelo():void{
    this.modeloService.findAll().subscribe((resposta) =>{
      this.modelos = resposta;
    })
  }

  findAllmarca():void{
    this.marcaService.findAll().subscribe((resposta) =>{
      this.marcas = resposta;
    })
  }

}
