import {Component, OnInit, OnDestroy} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/timer';

import { OrdersService } from '../../services/orders.service';
import {AllosService} from "../../services/allos.service";
import {Observable} from "rxjs/Observable";
import {AnonymousSubscription} from "rxjs/Subscription";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders;
  allos;
  allSelected = true;
  currentAlloId: number;
  currentAlloName: string;

  private timerSubscription: AnonymousSubscription;

  constructor(private ordersService: OrdersService, private allosService: AllosService) {
  }

  public ngOnInit(): void {

    this.allosService.getActiveAllos().subscribe((data) => {
      this.allos = data;
      this.currentAlloId = this.allos[0].id;
      this.currentAlloName = "Toutes";
      this.refreshData(this.currentAlloId);
    });
  }

  public ngOnDestroy(): void {

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private subscribeToData(): void {

    this.timerSubscription = Observable.timer(8000)
      .subscribe(() => this.refreshData(this.currentAlloId));
  }

  private refreshData(alloId): void {

    if (!this.allSelected) {
      this.ordersService.getOrdersNotFinishForAlloId(alloId).subscribe((data) => {

        this.orders = data;
        this.subscribeToData();

      });
    } else {
      this.ordersService.getOrdersNotFinish().subscribe((data) => {

        this.orders = data;
        this.subscribeToData();

      });
    }

  }

  removeOrder(id) {

    this.ordersService.postRemoveOrder(id).subscribe(res => {
      this.refreshData(this.currentAlloId);
    });
  }

  updateOrder(id,state) {
    state = !state;
    this.ordersService.postUpdateOrder(id,state).subscribe(res => {
      this.refreshData(this.currentAlloId);
    });
  }

  allOrders() {
    this.allSelected = true;
    this.currentAlloName = "Toutes";
    this.refreshData(this.currentAlloId);
  }

  alloChange(id,name) {
    this.allSelected = false;
    this.currentAlloId = id;
    this.currentAlloName = name;
    this.refreshData(this.currentAlloId);
  }

}
