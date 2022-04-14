import { VeiculoDetalheResolver } from './views/components/veiculo/guards/veiculo-guard.resolver';
import { ModeloDetalheResolver } from './views/components/modelo/guards/modelo-guard.resolver';
import { MarcaDetalheResolver } from './views/components/marca/guards/marca-guard.resolver';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HeaderComponent } from './views/components/template/header/header.component';
import { FooterComponent } from './views/components/template/footer/footer.component';
import { HomeComponent } from './views/components/home/home.component';
import { MarcaReadComponent } from './views/components/marca/marca-read/marca-read.component';
import { ModeloReadComponent } from './views/components/modelo/modelo-read/modelo-read.component';
import { VeiculoReadComponent } from './views/components/veiculo/veiculo-read/veiculo-read.component';
import { MarcaUpdateComponent } from './views/components/marca/marca-update/marca-update.component';
import { MarcaDeleteComponent } from './views/components/marca/marca-delete/marca-delete.component';
import { MarcaCreateComponent } from './views/components/marca/marca-create/marca-create.component';
import { ModeloCreateComponent } from './views/components/modelo/modelo-create/modelo-create.component';
import { ModeloDeleteComponent } from './views/components/modelo/modelo-delete/modelo-delete.component';
import { ModeloUpdateComponent } from './views/components/modelo/modelo-update/modelo-update.component';
import { VeiculoUpdateComponent } from './views/components/veiculo/veiculo-update/veiculo-update.component';
import { VeiculoDeleteComponent } from './views/components/veiculo/veiculo-delete/veiculo-delete.component';
import { VeiculoCreateComponent } from './views/components/veiculo/veiculo-create/veiculo-create.component';
import { MarcaSearchComponent } from './views/components/marca/marca-search/marca-search.component';
import { ModeloSearchComponent } from './views/components/modelo/modelo-search/modelo-search.component';
import { VeiculoSearchComponent } from './views/components/veiculo/veiculo-search/veiculo-search.component';


@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent, MarcaReadComponent, ModeloReadComponent, VeiculoReadComponent, MarcaUpdateComponent, MarcaDeleteComponent, MarcaCreateComponent, ModeloCreateComponent, ModeloDeleteComponent, ModeloUpdateComponent, VeiculoUpdateComponent, VeiculoDeleteComponent, VeiculoCreateComponent, MarcaSearchComponent, ModeloSearchComponent, VeiculoSearchComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSnackBarModule,
  ],
  providers: [MarcaDetalheResolver, ModeloDetalheResolver, VeiculoDetalheResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
