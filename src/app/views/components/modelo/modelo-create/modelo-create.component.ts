import { ModeloService } from './../../../../services/modelo.service';
import { Marca } from './../../../../models/marca';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MarcaService } from './../../../../services/marca.service';
import { MatPaginator } from '@angular/material/paginator';
import { MarcaDataSource } from './../../../../config/marca-data-source';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Modelo } from 'src/app/models/modelo';

@Component({
  selector: 'app-modelo-create',
  templateUrl: './modelo-create.component.html',
  styleUrls: ['./modelo-create.component.css']
})
export class ModeloCreateComponent implements OnInit {
   
  modelo: Modelo = new Modelo;
    
  marcas: Marca[] = [];

  formulario!: FormGroup;

  dataSource!: MarcaDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private modeloService: ModeloService,
    private marcaService: MarcaService,
    private Router: Router,
    private Http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.findAll();
    this.formulario = this.formBuilder.group({
      id:[null],
      nome:[null],
      marca:[null]
    })
  }
  
  create(): void{
    this.modeloService.create(this.formulario.value).subscribe(() =>{
      this.Router.navigate(['modelos'])
      this.modeloService.message('Modelo criado com sucesso !!')
    }, ex => {
      console.log(ex)
     if(ex.error.error.match('Erro na')){
        this.modeloService.message(ex.error.error)
      }
   }
    )
  }

  cancel(): void{
    this.Router.navigate(['modelos'])
    this.marcaService.message('Ação cancelada')
  }

  findAll():void{
    this.marcaService.findAll().subscribe((resposta) =>{
      this.marcas = resposta;
    })
  }

}