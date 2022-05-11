import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: Usuario= new Usuario
  confirmarSenha: string
  tipoUsuario: string
  idUser:number

  constructor(
    private authService:AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if(environment.token==''){
      alert("Sua sessão expirou")
       this.router.navigate(['/entrar'])
  }
  this.idUser=this.route.snapshot.params['id']
  this.findByIdUser(this.idUser)

}
confirmSenha(event:any){
  this.confirmarSenha=event.target.value
}

tipoUser(event:any){
  this.tipoUsuario=event.target.value
}

atualizar(){
    this.user.tipo=this.tipoUsuario

    if(this.user.senha != this.confirmarSenha){
    alert("As senhas estão incorretas")
    }else{
      this.authService.atualizar(this.user).subscribe((resp: Usuario)=> {this.user=resp 
      this.router.navigate(["/inicio"])
      alert("Usuario atualizado com sucesso!")})
      environment.token=''
      environment.nome=''
      environment.foto=''
      environment.id=0
      this.router.navigate(['/entrar'])
    }
}
findByIdUser(id:number){
  this.authService.getByIdUser(id).subscribe((resp:Usuario)=>{
    this.user=resp
  })
}
}
