
import { Marca } from './../../../../models/marca';
import { MarcaService } from 'src/app/services/marca.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModeloService } from './../../../../services/modelo.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { MatPaginator } from '@angular/material/paginator';
import { VeiculoDataSource } from './../../../../config/veiculo-data-source';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Modelo } from 'src/app/models/modelo';
import { Veiculo } from 'src/app/models/veiculo';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-veiculo-update',
  templateUrl: './veiculo-update.component.html',
  styleUrls: ['./veiculo-update.component.css']
})
export class VeiculoUpdateComponent implements OnInit {
   
  veiculo: Veiculo = new Veiculo;

  modelos: Modelo[] = [];
  marcas: Marca[] = [];

marca: Marca = new Marca;

  formulario!: FormGroup;

  dataSource!: VeiculoDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private veiculoService: VeiculoService,
    private modeloService: ModeloService,
    private Router: Router,
    private marcaService: MarcaService,
    private Http: HttpClient,
    private formBuilder: FormBuilder,
    private route:  ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.findAllmodelo();
    this.findAllmarca();

    let veiculo = this.route.snapshot.data["veiculo"];
    this.formulario = this.formBuilder.group({
      id:[veiculo.id],
      valor:[veiculo.valor],
      modelo: [veiculo.modelo.id],
      marca: [veiculo.modelo.marca.id]
    });
  }

  cancel(): void{
    this.Router.navigate(['veiculos'])
    this.modeloService.message('Ação cancelada')
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
  
  update(): void{
    let modelo = this.formulario.get('modelo')?.value;
    this.formulario.get('modelo')?.setValue({id: modelo});
      this.veiculoService.update(this.formulario.value).subscribe(() =>{
      this.Router.navigate(['veiculos'])
      this.modeloService.message('Veiculo Atualizado com sucesso !!')
    })
  }
}