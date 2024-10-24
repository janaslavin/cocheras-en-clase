import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {


  header: { nro: string, mes: string, usos: string, cobrado: string } = {
    nro: "N°", 
    mes: "Mes",
    usos: 'Uso',
    cobrado: 'Cobrado',
    };

}
