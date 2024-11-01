import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { EstacionamientosService } from '../../services/estacionamientos.service';
import { CocherasService } from '../../services/cocheras.service';
import { Reportes } from '../../interfaces/reportes';
import { Estacionamiento } from '../../interfaces/estacionamiento';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent implements OnInit {
[x: string]: any;
  titulo: string = "Estado de la cochera";
  header: { nro: string, mes: string, usos: string, cobrado: string } = {
    nro: "N°",
    mes: "Mes",
    usos: 'Usos',
    cobrado: 'Cobrado',
  };

  reportes: Reportes[] = [];
  
  

  cochera = inject(CocherasService);
  estacionamientos = inject(EstacionamientosService);
  ngOnInit(){
    // this.traerEstacionamientos();
    // this.traerCocherasById(4);
    this.traerEstacionamientos().then(res => {
      this.reportes = res;
      console.log(res)
    })

  };

  traerCocherasById(id: number){
    this.cochera.getCocherasById(id).then(cochera => {
      console.log(cochera)
    })
  };

  //<Estacionamiento[]>//
  traerEstacionamientos(){
     return this.estacionamientos.estacionamientos().then(estacionamientos => {
      let reportes: Reportes[] = []
      for (let estacionamiento of estacionamientos){
        if (estacionamiento.horaEgreso !== null){
          let fecha = new Date(estacionamiento.horaEgreso);
          let mes = fecha.toLocaleDateString("es-Cl", {
      month: "numeric",
      year: "numeric",
    })
      const indiceMes = reportes.findIndex((res) => res.mes === mes)
      if (indiceMes === -1){
        reportes.push({
          mes: mes,
          usos: 1,
          cobrados: estacionamiento.costo,
        })
      } else {
        reportes[indiceMes].usos=+1; 
        reportes[indiceMes].cobrados += estacionamiento.costo;
      } 
    }} return reportes;
  } 
  )
    };
  }

function callback(reportes: Reportes[]) {
  throw new Error('Function not implemented.');
}

