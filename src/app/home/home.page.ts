import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MacetaServiceService } from '../maceta-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private macetaService: MacetaServiceService, private alertController: AlertController) {}
  array = [ ];

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Estado riego',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  regarMaceta(idMaceta: number){
    console.log(idMaceta);
    this.macetaService.regarMacetas(idMaceta).subscribe(
      (res) => {
        this.presentAlert(res.glosa);
      },
      (error:HttpErrorResponse) => {
        if(error.status == 400){
          this.presentAlert(error.error.glosa);
        }else{
          this.presentAlert("Se present&oacute; un problema con el servicio de regado, intente m&acute;s tarde");
          console.log(error.status);
          console.log(error.message);
        }
      }
    );
  }

  prueba(){
    this.macetaService.obtenerMacetas().subscribe(
      (res)=>{
        console.log("done");
        res.data.forEach(element => {
          
          if(element.habilitado){
            element.macetas.forEach(maceta =>{
              if(maceta.habilitada){
                let elemento = {
                  id_maceta : element.id_muro,
                  id_muro : maceta.id
                }
                this.array.push(elemento);
              }
            })
          }
        });
        
      },
      (error:HttpErrorResponse) => {
        if(error.status == 400){
          console.log(error.error.glosa);
        }else{
          console.log(error.status);
          console.log(error.message);
        }
    });
  }
}
