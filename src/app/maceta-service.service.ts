import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaMaceta } from './auth/RespuestaMaceta';
import { tap } from 'rxjs/operators';
import { RespuestaRiego } from './auth/RespuestaRiego';

@Injectable({
  providedIn: 'root'
})
export class MacetaServiceService {
  ENDPOINT_ADDRESS: string = 'https://api-integracion-sistema.herokuapp.com/maceta/all';
  ENDPOINT_REGAR: string = 'https://api-integracion-sistema.herokuapp.com/regar';
  constructor(private httpClient: HttpClient) { }

  obtenerMacetas(): Observable<RespuestaMaceta>{
    return this.httpClient.get(this.ENDPOINT_ADDRESS).pipe(
      tap(async (res: RespuestaMaceta) => {
        console.log(res);
      })
    );
  }

  regarMacetas(idMaceta: number){
    let macetaRegada = {
      id : idMaceta,
      tiempo : 20,
      cantidad:  2
    }
    return this.httpClient.post(this.ENDPOINT_REGAR, macetaRegada).pipe(
      tap(async (res: RespuestaRiego) => {
        console.log(res.glosa);
      })
    );
  }
}
