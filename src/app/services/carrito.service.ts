/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Cliente, Pedido, Producto, ProductoPedido } from '../models';
import { Subject, Subscription } from 'rxjs';
import { FirebaseauthService } from './firebaseauth.service';
import { FirestoreService } from './firestore.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private pedido: Pedido;
  pedido$ = new Subject<Pedido>();
  path = 'carrito/';
  uid = '';
  cliente: Cliente;

  carritoSuscriber: Subscription;
  clienteSuscriber: Subscription;
  loading: any;

  constructor(public firebaseauthService: FirebaseauthService,
              public firestoreService: FirestoreService,
              public toastController: ToastController,
              public loadingController: LoadingController) { }


  loadCarrito(){
  }

  getCarrito(){
  }

  addProducto(producto: Producto){
  }

  removeProducto(producto: Producto){
  }

  clearCarrito(){}
}
