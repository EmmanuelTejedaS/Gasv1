import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, MenuController, Platform } from '@ionic/angular';
import { Router } from 'express';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(public menu: MenuController) { }

  ngOnInit() {}

  openMenu(){
    console.log('open menu');
    this.menu.toggle('principal');
  }

}
