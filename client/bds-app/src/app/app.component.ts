import { Component } from '@angular/core';


import { OrdersService } from './services/orders.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ OrdersService ]
})
export class AppComponent {
}
