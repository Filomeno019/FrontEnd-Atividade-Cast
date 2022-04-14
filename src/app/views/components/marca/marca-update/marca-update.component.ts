import { ActivatedRoute, Router } from "@angular/router";
import { MarcaService } from "src/app/services/marca.service";
import { MatPaginator } from "@angular/material/paginator";
import { MarcaDataSource } from "./../../../../config/marca-data-source";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Marca } from "./../../../../models/marca";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-marca-update",
  templateUrl: "./marca-update.component.html",
  styleUrls: ["./marca-update.component.css"],
})
export class MarcaUpdateComponent implements OnInit {
  marca: Marca = new Marca();

  nome: FormControl = new FormControl(null);

  formulario!: FormGroup;

  dataSource!: MarcaDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private marcaService: MarcaService,
    private Router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id")!;
    this.formulario = this.formBuilder.group({
      id: [id],
      nome: [],
    });

    let marca = this.route.snapshot.data["marca"];
    this.formulario = this.formBuilder.group({
      id: [id],
      nome: [marca.nome]
    });

    /** 
    const dados = this.route.snapshot.data["marca"];
    if (dados) {
      this.marca = dados;
    }*/
  }

  cancel(): void {
    this.Router.navigate(["marcas"]);
    this.marcaService.message("Ação cancelada");
  }

  //findById(): void{
  //this.service.findById(this.id_tec).subscribe(resposta =>{
  //   this.marcas = resposta;
  //  })
  //  }

  update(): void {
    this.marcaService.update(this.formulario.value).subscribe((resposta) => {
      this.Router.navigate(["marcas"]);
      this.marcaService.message("Marca atualizada com sucesso !!");
    });
  }
}
