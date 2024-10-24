import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../interfaces/cochera';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { CocherasService } from '../../services/cocheras.service';
import { EstacionamientosService } from '../../services/estacionamientos.service';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './estado-cocheras.component.html',
  styleUrl: './estado-cocheras.component.scss'
})
export class EstadoCocherasComponent {
  //  else
  //    this.cocheras.deshabilitar(cochera).then(()=> this.traerCocheras());
  //  };
  // cambiarDisponibilidadCocheras(numeroFila: number){
  //   if (this.filas[numeroFila].deshabilitada === true){
  //     this.filas[numeroFila].deshabilitada = false;
  //   }else {
  //     this.filas[numeroFila].deshabilitada = true;
  //   }
  // }


  titulo: string = "Estado de la cochera";
  header: { nro: string, disponibilidad: string, ingreso: string, acciones: string } = {
    nro: "N°",
    disponibilidad: "Disponibilidad",
    ingreso: 'Ingreso',
    acciones: 'Acciones',
  };
  filas: Cochera[] = [];

  //* ngOnInit se carga automatico cuando carga la pagina
  ngOnInit() {
    this.traerCocheras();
  }

  auth = inject(AuthService);
  cocheras = inject(CocherasService);
  estacionamientos = inject(EstacionamientosService);


  traerCocheras() {
    this.cocheras.cocheras().then(cocheras => {
      this.filas = [];

      for (let cochera of cocheras) {
        this.estacionamientos.buscarEstacionamientoActivo(cochera.id).then(estacionamiento => {
          this.filas.push({
            ...cochera,
            activo: estacionamiento,
          });
        })
      }
    });
  }

  siguienteNumero: number = 1;
  datosEstadoCocheras = {
    descripcion: "AAA000"
  }

  agregarFila() {
    return fetch("http://localhost:4000/cocheras/", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${this.auth.getToken()}`,
      },
      body: JSON.stringify(this.datosEstadoCocheras),
    }).then(res => {
      if (!res.ok) {
        throw new Error("Error al agregar nueva fila: " + res.statusText);
      }
      return res.json();
    })
      .then(data => {
        console.log(data);
        this.ngOnInit();
      })
      .catch(error => {
        console.error('Hubo un problema con la operación fetch:', error);
      })
  }

  /** Elimina la fila de la cochera seleccionada */
  borrarFila(cocheraId: number) {
    fetch('http://localhost:4000/cocheras/' + cocheraId, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ` + this.auth.getToken(),
      },
    }).then(() => {
      this.traerCocheras();
    });
  }


  /** Cambia la disponibilidad de una cochera, si esta habilitada se deshabilita, y viceversa */

  // cambiarDisponibilidadCocheras(cocheraId: number, habilitada: boolean){

  // manera larga
  // if(this.filas[numeroFila].disponibilidad === true){
  //   this.filas[numeroFila].disponibilidad = false;
  // } else {
  //   this.filas[numeroFila].disponibilidad = true;
  // this.filas[numeroFila].deshabilitada = !this.filas[numeroFila].deshabilitada;

  // const cochera = this.filas.find(cochera => cochera.id === cocheraId)!;

  cambiarDisponibilidadCocheras(cocheraId: number, event:Event) {
    event.stopPropagation();
    const cochera = this.filas.find(cochera => cochera.id === cocheraId);
    if(!cochera) return;
    if (cochera.deshabilitada) {
      this.cocheras.habilitar(cochera).then(() => this.traerCocheras());
    } else {
      this.cocheras.deshabilitar(cochera).then(() => this.traerCocheras());
    };
  }

  ;
  //  if (cochera.deshabilitada)
  //   this.cocheras.habilitar(cochera).then(()=> this.traerCocheras());
  //  else
  //    this.cocheras.deshabilitar(cochera).then(()=> this.traerCocheras());
  //  };

  // cambiarDisponibilidadCocheras(numeroFila: number){
  //   if (this.filas[numeroFila].deshabilitada === true){
  //     this.filas[numeroFila].deshabilitada = false;
  //   }else {
  //     this.filas[numeroFila].deshabilitada = true;
  //   }
  // }

  showModal(indice: number, event:Event) {
    event.stopPropagation();
    Swal.fire({
      title: "Seguro que quieres borrar la fila?",
      text: "Una vez hecho no hay vuelta atrás!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Listo!",
          text: "La fila fue eliminada con éxito.",
          icon: "success"
        });
        this.borrarFila(indice);
      }
    });
  }

  /** obtener las cocheras del back end */
  // getCocheras(){
  //   fetch("http://localhost:4000/cocheras", {
  //     headers:{
  //       authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXNBZG1pbiI6MSwiaWF0IjoxNzI2NjcwODE0LCJleHAiOjE3MjcyNzU2MTR9.5_phgc5GM8d9i8Jks8urEViOmVcQ3FK6wSGYnOpzCik'
  //     },
  //   });
  // }

  async abrirModalNuevoEstacionamiento(idCochera: number) {
    await Swal.fire({
      title: "Ingrese la patente del vehículo",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Ingrese una patente válida";
        }
        return
      }
    }).then(res => {
      if (res.isConfirmed) {
        this.estacionamientos.estacionarAuto(res.value, idCochera).then(() => {
          //actualizar cocheras
          this.traerCocheras();
        });
      }
    })
  }


}
