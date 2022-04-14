import { Veiculo } from 'src/app/models/veiculo';
import { Modelo } from 'src/app/models/modelo';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModeloService } from './../../../../services/modelo.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { MatPaginator } from '@angular/material/paginator';
import { VeiculoDataSource } from './../../../../config/veiculo-data-source';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-veiculo-create',
  templateUrl: './veiculo-create.component.html',
  styleUrls: ['./veiculo-create.component.css']
})
export class VeiculoCreateComponent implements OnInit {
   
  veiculo: Veiculo = new Veiculo;

  modelos: Modelo[] = [];

  formulario!: FormGroup;

  dataSource!: VeiculoDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private veiculoService: VeiculoService,
    private modeloService: ModeloService,
    private Router: Router,
    private Http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.findAll();
    this.formulario = this.formBuilder.group({
      id:[null],
      valor:[null],
      modelo:[null]
    })
  }

  create(): void{
   this.veiculoService.create(this.formulario.value).subscribe(() =>{
     this.Router.navigate(['veiculos'])
     this.veiculoService.message('Veiculo criado com Sucesso !!')
    })
  }

  cancel(): void{
    this.Router.navigate(['veiculos'])
    this.modeloService.message('Ação cancelada')
  }

  findAll():void{
    this.modeloService.findAll().subscribe((resposta) =>{
      this.modelos = resposta;
    })
  }

}