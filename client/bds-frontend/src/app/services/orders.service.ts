import { Injectable } from '@angular/core';

import { ApiService } from "./api.service";

@Injectable()
export class OrdersService {

  constructor(private apiService: ApiService  ) {
  }

  postOrder(order,alloId,specName) {

    let quantity: number;

    if (!order.quantity) {
      quantity = 1;

    } else {
      quantity = order.quantity;
    }

    let newOrder = {
      name: order.name,
      address: order.address,
      alloId: alloId,
      quantity: quantity,
      specification: specName
    };

    return this.apiService.post("/add-order/",{"order": newOrder})
  }


}
