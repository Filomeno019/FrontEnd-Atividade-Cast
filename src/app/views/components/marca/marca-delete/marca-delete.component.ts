import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from 'src/app/services/marca.service';
import { Marca } from './../../../../models/marca';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marca-delete',
  templateUrl: './marca-delete.component.html',
  styleUrls: ['./marca-delete.component.css']
})
export class MarcaDeleteComponent implements OnInit {

  marcas: Marca = {
    nome: '',
  }

  id_tec = ''


  constructor(
    private marcaService: MarcaService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!
    this. findById();
  }

  
  findById(): void{
    this.marcaService.findById(this.id_tec).subscribe(resposta =>{
      this.marcas = resposta;
    })
  }
  
  cancel(): void{
    this.router.navigate(['marcas'])
    this.marcaService.message('Ação cancelada')
  }

  delete(): void{
    this.marcaService.delete(this.id_tec).subscribe(resposta =>{
      this.router.navigate(['marcas'])
      this.marcaService.message('Marca deletada com sucesso !!')
    }, ex => {
      console.log(ex)
     if(ex.error.error.match('Modelos associados')){
        this.marcaService.message(ex.error.error)
      }
    }
    )
  }


}