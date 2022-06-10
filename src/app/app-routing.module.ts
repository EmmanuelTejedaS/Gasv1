import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SetProductosComponent } from './backend/set-productos/set-productos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { MispedidosComponent } from './pages/mispedidos/mispedidos.component';

import { canActivate } from '@angular/fire/compat/auth-guard';
import { map } from 'rxjs/operators';

const isAdmin = (next: any) => map( (user: any) => !!user && 'I80yGAVUvVULfG0IMH2RLA6nZY32' === user.uid);

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'set-productos', component: SetProductosComponent, ...canActivate(isAdmin) },
  { path: 'mis-pedidos', component: MispedidosComponent },
  { path: 'carrito', component: CarritoComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
