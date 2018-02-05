import { Component, OnInit } from '@angular/core';
import {AllosService} from "../../services/allos.service";
import {OrdersService} from "../../services/orders.service";
import {SpecificationsService} from "../../services/specifications.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  allos;
  specs;
  currentSpec;
  currentAllo;
  errorMessage;

  constructor(private ordersService: OrdersService, private allosService: AllosService,
              private specificationService: SpecificationsService, private router: Router) {
  }

  ngOnInit() {

    this.allosService.getActiveAllos().subscribe((data) => {
      this.allos = data;
      this.currentAllo = this.allos[0];

      if (this.currentAllo.hasSpec === 1) {
        this.specificationService.getSpecsForAlloId(this.currentAllo.id).subscribe((data) => {
          this.specs = data;
          this.currentSpec = this.specs[0];
        });
      }
    });
  }

  register(order) {

    let specName = "";
    if (this.currentAllo.hasSpec && this.currentSpec != null) {
      specName = this.currentSpec.name;
    }

    if (this.valideForm(order)) {
      this.ordersService.postOrder(order,this.currentAllo.id,specName).subscribe( () => {

        this.router.navigate(['/orders']);
      });

    }
  }

  private valideForm(order) {

    if (this.currentAllo.hasQuantity) {

      if (order.quantity == "") {
        this.errorMessage = "quantity is require";
        return false;

      }else if (isNaN(order.quantity)) {
        this.errorMessage = "quantity must be a number";
        return false;

      } else if (order.quantity.length > 2) {
        this.errorMessage = "quantity too much";
        return false;
      }

    } else if (order.name == "") {
      this.errorMessage = "name is require";
      return false;

    } else  if (order.name.length > 30) {
      this.errorMessage = "name too long";
      return false;

    } else if (order.address == "") {
      this.errorMessage = "address is require";
      return false;

    } else if (order.address.length > 60) {
      this.errorMessage = "address too long";
      return false;
    }

    return  true;
  }

  alloChange(id) {
    this.allosService.getAlloForId(id).subscribe((data) => {
      this.currentAllo = data[0];

      if (this.currentAllo.hasSpec === 1) {
        this.specificationService.getSpecsForAlloId(this.currentAllo.id).subscribe((data) => {
          this.specs = data;
          this.currentSpec = this.specs[0];
        });
      }
    });

  }

  specChange(id) {
    this.specificationService.getSpecWithId(id).subscribe( (data) => {
      this.currentSpec = data[0];
    })
  }

}
