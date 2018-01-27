import { Component } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  orders;

  constructor(private ordersService: OrdersService) {

    this.ordersService.getOrders().subscribe((data) => {

      this.orders = data;

    });
  }

}
