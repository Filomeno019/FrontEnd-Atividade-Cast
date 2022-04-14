import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MarcaService } from 'src/app/services/marca.service';
import { ModeloService } from './../../../../services/modelo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MarcaDataSource } from 'src/app/config/marca-data-source';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Marca } from './../../../../models/marca';
import { Modelo } from 'src/app/models/modelo';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modelo-update',
  templateUrl: './modelo-update.component.html',
  styleUrls: ['./modelo-update.component.css']
})
export class ModeloUpdateComponent implements OnInit {
   
  modelo: Modelo = new Modelo;
    
  marcas: Marca[] = [];

  formulario!: FormGroup;

  idModelo: any;

  dataSource!: MarcaDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private modeloService: ModeloService,
    private marcaService: MarcaService,
    private Router: Router,
    private formBuilder: FormBuilder,
    private route:  ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.findAll();
    let modelo = this.route.snapshot.data["modelo"];
    this.formulario = this.formBuilder.group({
      id:[modelo.id],
      nome:[modelo.nome],
      marca: [modelo.marca.id]
    });
  }

  findById(): void{
    this.modeloService.findById(this.idModelo).subscribe(resposta =>{
      this.modelo = resposta;
    })
  }

  update(): void{
    let marca = this.formulario.get('marca')?.value;
    this.formulario.get('marca')?.setValue({id: marca});
    this.modeloService.update(this.formulario.value).subscribe(() =>{
      this.Router.navigate(['modelos'])
      this.modeloService.message('Modelo Atualizado com sucesso !!')
    })
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