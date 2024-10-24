import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  esAdmin: boolean = true;

  // resultadoInput: string = "";

  // abrirModal(){
  //   Swal.fire({
  //     title: "Enter your IP address",
  //     input: "text",
  //     inputLabel: "Your IP address",
  //     inputValue: "",
  //     showCancelButton: true,
  //   }).then((result)=> {
  //     this.resultadoInput = result.value;
  //   })
  // }

}


