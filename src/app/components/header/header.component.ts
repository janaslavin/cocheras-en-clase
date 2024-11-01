import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  esAdmin: boolean = true;

  auth = inject(AuthService);
  router = inject(Router);

  logout() {// llama al auth service para hacer logout
    this.auth.logout();
    this.router.navigate(['/login']);  // redirige a la página de login
}

};
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




