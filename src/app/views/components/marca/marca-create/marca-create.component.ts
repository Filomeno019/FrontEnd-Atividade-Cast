import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { Marca } from './../../../../models/marca';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MarcaDataSource } from 'src/app/config/marca-data-source';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-marca-create',
  templateUrl: './marca-create.component.html',
  styleUrls: ['./marca-create.component.css']
})
export class MarcaCreateComponent implements OnInit {
   
  marcas: Marca = new Marca;

  nome: FormControl = new FormControl(null);
  displayedColumns: string[] = ["nome", "action"];

  dataSource!: MarcaDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private marcaService: MarcaService,
    private Router: Router,
    private Http: HttpClient
  ) {}

  ngOnInit(): void {

  }

  create(): void{
    this.marcaService.create(this.marcas).subscribe(() =>{
      this.Router.navigate(['marcas'])
      this.marcaService.message('Marca criada com sucesso !!')
    }, ex => {
      console.log(ex)
     if(ex.error.error.match('possui cadastro')){
        this.marcaService.message(ex.error.error)
      }
    })

  }

  cancel(): void{
    this.Router.navigate(['marcas'])
    this.marcaService.message('Ação cancelada')
  }


  habilitaCampo(): boolean{
    return this.nome.valid 
  }

}