import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { Veiculo } from 'src/app/models/veiculo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-veiculo-delete',
  templateUrl: './veiculo-delete.component.html',
  styleUrls: ['./veiculo-delete.component.css']
})
export class VeiculoDeleteComponent implements OnInit {

  veiculo: Veiculo = new Veiculo;

  id_tec = ''


  constructor(
    private veiculoService: VeiculoService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!
    this. findById();
  }

  
  findById(): void{
    this.veiculoService.findById(this.id_tec).subscribe(resposta =>{
      this.veiculo = resposta;
    })
  }
  
  cancel(): void{
    this.router.navigate(['veiculos'])
    this.veiculoService.message('Ação cancelada')
  }

  delete(): void{
    this.veiculoService.delete(this.id_tec).subscribe(resposta =>{
      this.router.navigate(['veiculos'])
      this.veiculoService.message('Veiculo deletado com sucesso !!')
    })
  }
}