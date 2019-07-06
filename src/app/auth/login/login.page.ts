import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, public alertController: AlertController) { }

  ngOnInit() {
  }

  login(form){
    this.authService.login(form.value).subscribe(
      (res)=>{
        console.log(res);
        if(res.cargo=='experto'){
          this.router.navigateByUrl('home');
        }else{
          this.presentAlert("Usuario no cuenta con rol necesario");
        }
      },
      (error:HttpErrorResponse) => {
        if(error.status == 400){
          console.log(error.error.glosa);
          this.presentAlert(error.error.glosa);
          
        }else{
          console.log(error.status);
          console.log(error.message);
          this.presentAlert("Se present&oacute; con servicio");
        }
        
        
    });
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Problema en login',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}
