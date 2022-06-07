import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../models';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {
  @Input() producto: Producto;
  constructor( public alertController: AlertController,
               public toastController: ToastController) { }

  ngOnInit() {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'pedir producto?',
      message: 'quieres pedir este producto ahora?',
      buttons: [
        {
        text: 'NO',
        handler: ()=>{
          this.toastNo();
          console.log('NO');
        }
      },
      {
        text: 'SI',
        handler: ()=>{
         // this.carritoService.addProducto(this.producto);
          console.log('se agrego con exito :)');
        }
      }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async toastNo() {
    const toast = await this.toastController.create({
      message: 'hay mas productos por elegir',
      duration: 2000
    });
    toast.present();
  }

}
