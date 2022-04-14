import { VeiculoDetalheResolver } from './views/components/veiculo/guards/veiculo-guard.resolver';
import { ModeloDetalheResolver } from './views/components/modelo/guards/modelo-guard.resolver';
import { MarcaDetalheResolver } from './views/components/marca/guards/marca-guard.resolver';
import { VeiculoCreateComponent } from './views/components/veiculo/veiculo-create/veiculo-create.component';
import { VeiculoSearchComponent } from './views/components/veiculo/veiculo-search/veiculo-search.component';

import { ModeloSearchComponent } from './views/components/modelo/modelo-search/modelo-search.component';
import { ModeloUpdateComponent } from './views/components/modelo/modelo-update/modelo-update.component';
import { ModeloCreateComponent } from './views/components/modelo/modelo-create/modelo-create.component';

import { MarcaCreateComponent } from './views/components/marca/marca-create/marca-create.component';
import { MarcaSearchComponent } from './views/components/marca/marca-search/marca-search.component';
import { MarcaUpdateComponent } from './views/components/marca/marca-update/marca-update.component';

import { MarcaReadComponent } from "./views/components/marca/marca-read/marca-read.component";
import { HomeComponent } from "./views/components/home/home.component";

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModeloReadComponent } from "./views/components/modelo/modelo-read/modelo-read.component";
import { VeiculoReadComponent } from "./views/components/veiculo/veiculo-read/veiculo-read.component";
import { VeiculoUpdateComponent } from './views/components/veiculo/veiculo-update/veiculo-update.component';
import { VeiculoDeleteComponent } from './views/components/veiculo/veiculo-delete/veiculo-delete.component';
import { ModeloDeleteComponent } from './views/components/modelo/modelo-delete/modelo-delete.component';
import { MarcaDeleteComponent } from './views/components/marca/marca-delete/marca-delete.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "marcas",
    component: MarcaReadComponent,
  },
  {
    path: "modelos",
    component: ModeloReadComponent,
    resolve: {}
  },
  {
    path: "veiculos",
    component: VeiculoReadComponent,
  },


  {
    path: "marcas/update/:id",
    component: MarcaUpdateComponent,
    resolve: {marca : MarcaDetalheResolver}
  },
  {
    path: "marca/search",
    component: MarcaSearchComponent,
  },
  {
    path: "marca/create",
    component: MarcaCreateComponent
  },
  {
    path: "marcas/delete/:id",
    component: MarcaDeleteComponent
  },


  {
    path: "modelos/update/:id",
    component: ModeloUpdateComponent,
    resolve: {modelo : ModeloDetalheResolver}
  },
  {
    path: "modelo/search",
    component: ModeloSearchComponent,
  },
  {
    path: "modelo/create",
    component: ModeloCreateComponent
  },
  {
    path: "modelos/delete/:id",
    component: ModeloDeleteComponent
  },


  {
    path: "veiculos/update/:id",
    component: VeiculoUpdateComponent,
    resolve: {veiculo : VeiculoDetalheResolver}
  },
  {
    path: "veiculo/search",
    component: VeiculoSearchComponent,
  },
  {
    path: "veiculo/create",
    component: VeiculoCreateComponent
  },
  {
    path: "veiculos/delete/:id",
    component: VeiculoDeleteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
