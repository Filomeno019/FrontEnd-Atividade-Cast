import { MarcaService } from 'src/app/services/marca.service';
import { Marca } from './../../../../models/marca';
import { tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { FormControl } from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Veiculo } from "src/app/models/veiculo";
import { VeiculoDataSource } from "./../../../../config/veiculo-data-source";
import { VeiculoService } from "src/app/services/veiculo.service";

@Component({
  selector: "app-veiculo-read",
  templateUrl: "./veiculo-read.component.html",
  styleUrls: ["./veiculo-read.component.css"],
})
export class VeiculoReadComponent implements OnInit {
  veiculos: Veiculo[] = [];

  valor = "";
  idModelo: any;
  idMarca: any;
  valorDe!: any ;
  valorAte!: any;

  marcas: Marca[] = [];


  nomeform: FormControl = new FormControl(null);
  displayedColumns: string[] = ["nomeMarca","nomeModelo", "valor", "action"];

  dataSource!: VeiculoDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: VeiculoService,
    private marcaService: MarcaService,
    private Router: Router,
    private Http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dataSource = new VeiculoDataSource(this.service);
    this.dataSource.callingNewMethod();
  }

  ngAfterViewInit() {
    this.dataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    this.paginator.page.pipe(tap(() => this.find())).subscribe();
  }

  find() {
    this.dataSource.callingNewMethod(this.idMarca, this.idModelo, this.valorDe, this.valorAte, this.paginator.pageIndex, this.paginator.pageSize)
    this.service.message('Veiculos atualizados com sucesso')
  }

  navigateToCreate(): void {
    this.Router.navigate(["veiculo/create"]);
  }

  navigateToUpdate(): void {
    this.Router.navigate(["veiculo/update"]);
  }

  navigateToSearch(): void {
    this.Router.navigate(["veiculo/search"]);
  }

  findAllmarca():void{
    this.marcaService.findAll().subscribe((resposta) =>{
      this.marcas = resposta;
    })
  }

 
}
