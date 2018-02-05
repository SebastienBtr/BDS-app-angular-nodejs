import { Component, OnInit } from '@angular/core';

import {AllosService} from "../../services/allos.service";

@Component({
  selector: 'app-allos',
  templateUrl: './allos.component.html',
  styleUrls: ['./allos.component.css']
})
export class AllosComponent implements OnInit {

  allos;

  constructor(private allosService: AllosService) { }

  ngOnInit() {

    this.refreshData();
  }

  private refreshData(): void {

    this.allosService.getAllAllos().subscribe((data) => {
      this.allos = data;
    });
  }

  updateAllo(id,state) {
    state = !state;
    this.allosService.postUpdateAllo(id,state).subscribe(res => {
      this.refreshData();
    });
  }

}
