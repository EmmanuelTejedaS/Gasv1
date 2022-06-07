import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './producto/producto.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ], exports: [
    ProductoComponent
  ]
})
export class ComponentesModule { }
