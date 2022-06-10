import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { Subscription } from 'rxjs';
import { Pedido } from '../../models';

@Component({
  selector: 'app-mispedidos',
  templateUrl: './mispedidos.component.html',
  styleUrls: ['./mispedidos.component.scss'],
})
export class MispedidosComponent implements OnInit,OnDestroy {

  nuevosSuscriber: Subscription;
  culmidadosSuscriber: Subscription;
  pedidos: Pedido[] = [];
  pedidosEntregados: Pedido[] = [];

  nuevos = true;
  constructor(public menu: MenuController,
              public firestoreService: FirestoreService,
              public firebaseauthService: FirebaseauthService) { }

  ngOnInit() {
    this.getPedidosNuevos();
  }

  ngOnDestroy() {
    if (this.nuevosSuscriber) {
       this.nuevosSuscriber.unsubscribe();
    }
    if (this.culmidadosSuscriber) {
       this.culmidadosSuscriber.unsubscribe();
    }
 }

  openMenu(){
    console.log('open menu');
    this.menu.toggle('principal');
    }

    changeSegment(ev: any) {
      //  console.log('changeSegment()', ev.detail.value);
       const opc = ev.detail.value;
       if (opc === 'entregados') {
         this.nuevos = false;
         this.getPedidosCulminados();
         this.nuevosSuscriber.unsubscribe();

       }
       if (opc === 'nuevos') {
            this.nuevos = true;
            this.getPedidosNuevos();
            this.culmidadosSuscriber.unsubscribe();
      }
    }

    async getPedidosNuevos() {
      console.log('getPedidosNuevos()');
      const uid = await this.firebaseauthService.getUid();
      const path = 'Clientes/' + uid + '/pedidos/';
      this.nuevosSuscriber = this.firestoreService.getCollectionQuery<Pedido>(path,'estado', '==', 'enviado').subscribe( res => {
            if (res.length) {
                  console.log('getPedidosNuevos() -> res  ', res);
                  this.pedidos = res;
            }
      });
    }

    async getPedidosCulminados() {
      console.log('getPedidosCulminados()');
      const uid = await this.firebaseauthService.getUid();
      const path = 'Clientes/' + uid + '/pedidos/';
      let startAt = null;
      if (this.pedidosEntregados.length) {
          startAt = this.pedidosEntregados[this.pedidosEntregados.length - 1].fecha;
      }
      // eslint-disable-next-line max-len
      this.culmidadosSuscriber = this.firestoreService.getCollectionQuery<Pedido>(path,'estado', '==', 'entregado').subscribe( res => {
            if (res.length) {
                  console.log('getPedidosCulminados() -> res ', res);
                  this.pedidosEntregados = res;
            }
      });
    }

}
