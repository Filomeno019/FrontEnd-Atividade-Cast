import { MarcaDataSource } from "./../../../../config/marca-data-source";
import { MarcaService } from "./../../../../services/marca.service";

import { FormControl } from "@angular/forms";
import { Marca } from "./../../../../models/marca";
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { _MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { tap } from "rxjs";

@Component({
  selector: "app-marca-read",
  templateUrl: "./marca-read.component.html",
  styleUrls: ["./marca-read.component.css"],
})
export class MarcaReadComponent implements OnInit {
  marcas: Marca[] = [];

  nome = "";

  nomeform: FormControl = new FormControl(null);
  displayedColumns: string[] = ["nome", "action"];

  dataSource!: MarcaDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: MarcaService,
    private Router: Router,
    private Http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dataSource = new MarcaDataSource(this.service);
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
    this.dataSource.callingNewMethod(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.nome
    );
    this.service.message('Marcas atualizadas com sucesso')
  }

  navigateToCreate(): void {
    this.Router.navigate(["marca/create"]);
  } 

  navigateToUpdate(): void {
    this.Router.navigate(["marca/update"]);
  }

  navigateToSearch(): void {
    this.Router.navigate(["marca/search"]);
  }
}
