import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModeloService } from './../../../../services/modelo.service';
import { MatPaginator } from '@angular/material/paginator';
import { ModeloDataSource } from './../../../../config/modelo-data-source';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Modelo } from 'src/app/models/modelo';


@Component({
  selector: 'app-modelo-read',
  templateUrl: './modelo-read.component.html',
  styleUrls: ['./modelo-read.component.css']
})
export class ModeloReadComponent implements OnInit {
 
  modelos: Modelo[] = [];

  nome= ''

  nomeform: FormControl = new FormControl(null)
  displayedColumns: string[] = ["nomeMarca", "nome", "action"];
  
  dataSource!: ModeloDataSource;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ModeloService,
    private Router : Router,
    private Http : HttpClient) {}

    ngOnInit(): void {
      this.dataSource = new ModeloDataSource(this.service);
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
 
    this.paginator.page
      .pipe(
        tap(() => this.find())
      )
      .subscribe();
  }

  find() {
    this.dataSource.callingNewMethod(this.paginator.pageIndex, this.paginator.pageSize, this.nome);
    this.service.message('Modelos atualizados com sucesso')
  }

  navigateToCreate(): void {
    this.Router.navigate(["modelo/create"]);
  } 

  navigateToUpdate(): void {
    this.Router.navigate(["modelo/update"]);
  }

  navigateToSearch(): void {
    this.Router.navigate(["modelo/search"]);
  }

  recharge() {
    this.dataSource.callingNewMethod(this.paginator.pageIndex, this.paginator.pageSize, this.nome);
  }
}

