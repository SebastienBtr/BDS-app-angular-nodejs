import { Component, OnInit } from '@angular/core';
import {AllosService} from "../services/allos.service";
import {AnonymousSubscription} from "rxjs/Subscription";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/timer';
import {Observable} from "rxjs/Observable";
import {SpecificationsService} from "../services/specifications.service";
import {OrdersService} from "../services/orders.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  allos;
  specs;
  currentSpec;
  currentAllo;
  warningMessage: string;
  errorMessage: string;
  successMessage: string;

  private timerSubscription: AnonymousSubscription;

  constructor(private allosService: AllosService,private ordersService: OrdersService,
              private specificationService: SpecificationsService) {}

  ngOnInit() {

    this.refreshData();
  }

  private refreshData(): void {

    this.errorMessage = null;
    this.successMessage = null;

    this.allosService.getActiveAllos().subscribe((data) => {
      this.allos = data;
      this.subscribeToData();
    });
  }

  public ngOnDestroy(): void {

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private subscribeToData(): void {

    this.timerSubscription = Observable.timer(8000)
      .subscribe(() => this.refreshData());
  }

  chooseAllo(id) {

    this.errorMessage = null;
    this.warningMessage = null;
    this.successMessage = null;
    this.currentSpec = null;

    this.allosService.getActiveAlloForId(id).subscribe((data) => {

      let resp = data as Array<any>;

      if (resp.length > 0) {
        this.currentAllo = resp[0];

        if (this.currentAllo.hasSpec === 1) {
          this.specificationService.getSpecsForAlloId(this.currentAllo.id).subscribe((data) => {

            this.specs = data;
            this.currentSpec = this.specs[0];
          });
        }

        if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
        }

      } else {
        this.warningMessage = "Désolé le allo sélectionné n'est plus disponible pour le moment"
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

        this.currentAllo = null;
        this.currentSpec = null;
        this.refreshData();
        this.errorMessage = null;
        this.warningMessage = null;
        this.successMessage = "Votre commande a été envoyé avec succès"
      });

    }
  }

  backToSelection() {

    this.currentAllo = null;
    this.refreshData();
  }

  specChange(id) {
    this.specificationService.getSpecWithId(id).subscribe( (data) => {
      this.currentSpec = data[0];
    })
  }

  private valideForm(order) {

    if (this.currentAllo.hasQuantity) {

      if (order.quantity == "") {
        this.errorMessage = "Veuillez saisir une quantité";
        return false;

      }else if (isNaN(order.quantity)) {
        this.errorMessage = "La quantité doit être un nombre";
        return false;

      } else if (order.quantity.length > 2) {
        this.errorMessage = "La quantité est trop grande";
        return false;
      }

    } else if (order.name == "") {
      this.errorMessage = "Veuillez saisir un nom";
      return false;

    } else  if (order.name.length > 30) {
      this.errorMessage = "Le nom saisi est trop long";
      return false;

    } else if (order.address == "") {
      this.errorMessage = "Veuillez saisir une adresse";
      return false;

    } else if (order.address.length > 60) {
      this.errorMessage = "L'adresse saisie est trop longue";
      return false;
    }

    return  true;
  }

}
