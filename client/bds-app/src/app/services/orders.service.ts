import { Injectable } from '@angular/core';

import { ApiService } from "./api.service";

@Injectable()
export class OrdersService {

  prefix : string = "/api";
  domain : string = "http://51.15.207.216:3000";
  //TODO add domain in a config file and import it

  constructor(private apiService: ApiService  ) {
  }

  getOrders() {
    return this.apiService.get(this.domain+this.prefix+"/orders");
  }
}
