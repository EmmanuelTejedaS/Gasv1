import { Component, OnInit, Input } from '@angular/core';
import { ProductoPedido } from '../../models';

@Component({
  selector: 'app-itemcarrito',
  templateUrl: './itemcarrito.component.html',
  styleUrls: ['./itemcarrito.component.scss'],
})
export class ItemcarritoComponent implements OnInit {

  @Input() productoPedido: ProductoPedido;

  constructor() { }

  ngOnInit() {}

}
