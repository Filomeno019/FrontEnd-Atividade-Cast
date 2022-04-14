import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ModeloService } from './../../../../services/modelo.service';
import { Modelo } from 'src/app/models/modelo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modelo-delete',
  templateUrl: './modelo-delete.component.html',
  styleUrls: ['./modelo-delete.component.css']
})
export class ModeloDeleteComponent implements OnInit {

  modelo: Modelo = new Modelo;

  id_tec = ''

  constructor(
    private modeloService: ModeloService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!
    this. findById();
  }

  
  findById(): void{
    this.modeloService.findById(this.id_tec).subscribe(resposta =>{
      this.modelo = resposta;
    })
  }
  
  cancel(): void{
    this.router.navigate(['modelos'])
    this.modeloService.message('Ação cancelada')
  }

  delete(): void{
    this.modeloService.delete(this.id_tec).subscribe(resposta =>{
      this.router.navigate(['modelos'])
      this.modeloService.message('Modelo deletado com sucesso !!')
    }, ex => {
      console.log(ex)
      if(ex.error.error.match('Veiculos associados')){
        this.modeloService.message(ex.error.error)
      }
    })
  }


}