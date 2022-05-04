import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  entrar(UsuarioLogin:UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>('http://localhost:8080/usuarios/logar',UsuarioLogin)

  }
  cadastrar(Usuario:Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('http://localhost:8080/usuarios/cadastrar',Usuario)
  }
}
