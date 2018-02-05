import { Injectable } from '@angular/core';

import { ApiService } from "./api.service";

@Injectable()
export class OrdersService {

  constructor(private apiService: ApiService  ) {
  }

  getAllOrders() {
    return this.apiService.get("/all-orders");
  }

  getOrdersNotFinish() {
    return this.apiService.get("/orders-not-finish");
  }

  getOrdersNotFinishForAlloId(alloId) {
    return this.apiService.get("/orders-not-finish/"+alloId);
  }

  postRemoveOrder(id) {
    return this.apiService.post("/remove/"+id,{})
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

  postUpdateOrder(id,state) {
    return this.apiService.post("/update-in-progress/"+id,{"state":state})
  }
}
