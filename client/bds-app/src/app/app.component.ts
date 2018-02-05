import { Component } from '@angular/core';


import { OrdersService } from './services/orders.service';
import {AllosService} from "./services/allos.service";
import {SpecificationsService} from "./services/specifications.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ OrdersService, AllosService, SpecificationsService ]
})
export class AppComponent {
}
