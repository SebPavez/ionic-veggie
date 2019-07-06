import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS:  string  =  'https://api-integracion-sistema.herokuapp.com/login';
  authSubject  =  new  BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private storage: Storage) { }
  
  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(this.AUTH_SERVER_ADDRESS, user).pipe(
      tap(async (res: AuthResponse) => {
        if(res.cargo == 'experto'){
          console.log("Usuario autenticado de manera correcta");
          await this.storage.set("HABILITADO", true);
          this.authSubject.next(true);
        }else{
          console.log("Usuario de manera incorrecta, cargo encontrado: "+res.cargo);
        }

      })
    );
  }

  async logout(){
    await this.storage.remove("HABILITADO");
    this.authSubject.next(false);
  }
  

  isLoggedIn(){
    return this.authSubject.asObservable();
  }
}
