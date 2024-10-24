import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { Cochera } from '../interfaces/cochera';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  estaLogueado(): boolean {
    if (this.getToken())
      return true;
    else
    return false;
  }

  auth = (AuthService);

  
  static getToken() {
    throw new Error('Method not implemented.');
  }

  Login(datosLogin: Login){
    return fetch("http://localhost:4000/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosLogin)
    })
    .then(res => {
      return res.json().then(resJson => {
        if(resJson.status === 'ok'){
          // login correcto 
          localStorage.setItem('token', resJson.token);
        return true;}
        else{
          return false;
        }
  })
})
  }
}
