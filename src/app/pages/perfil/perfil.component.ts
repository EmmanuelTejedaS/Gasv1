import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Cliente } from 'src/app/models';
import { Subscription } from 'rxjs';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestorageService } from '../../services/firestorage.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  cliente: Cliente = {
    uid: '',
    email: '',
    celular: '',
    foto: '',
    referencia: '',
    nombre: '',
    ubicacion: null,
  };

  newFile: any;

  uid = '';

  suscriberUserInfo: Subscription;

  ingresarEnable = false;

  constructor(public menu: MenuController,
              public firebaseauthService: FirebaseauthService,
              public firestorageService: FirestorageService,
              public firestoreService: FirestoreService
             ) { }

  async ngOnInit() {
    const uid = await this.firebaseauthService.getUid();
    console.log(uid);
  }

  openMenu(){
    console.log('open menu');
    this.menu.toggle('principal');
  }

  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
     const reader = new FileReader();
     reader.onload = ((image) => {
         this.cliente.foto = image.target.result as string;
     });
     reader.readAsDataURL(event.target.files[0]);
   }
 }

 async registrarse(){
  const credenciales = {
    email: this.cliente.email,
    password: this.cliente.celular
  };
  if(credenciales.email.length && credenciales.password.length){
    const res = await this.firebaseauthService.registrar(credenciales.email, credenciales.password).catch( err =>{
      console.log('error->', err);
     });
    console.log('getuid',res);
    const uid = await this.firebaseauthService.getUid();
    this.cliente.uid = uid;
    this.guardarUser();
    console.log(uid);
  }else{
    // this.toastSinDatos();
  }
}

async guardarUser() {
  const path = 'Clientes';
  const name = this.cliente.nombre;
  if(this.newFile !== undefined){
  const res = await this.firestorageService.uploadImage(this.newFile, path, name);
  this.cliente.foto = res;
}
  // eslint-disable-next-line @typescript-eslint/no-shadow
  this.firestoreService.createDoc(this.cliente, path, this.cliente.uid).then( res => {
      console.log('guardado con exito');
  }).catch(   error => {
  });
}

async salir(){
  //const uid = await this.firebaseauthService.getUid();
  //console.log(uid);
  this.firebaseauthService.logout();
  // this.suscriberUserInfo.unsubscribe();
 }

}
