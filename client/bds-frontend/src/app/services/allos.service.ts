import { Injectable } from '@angular/core';

import { ApiService } from "./api.service";

@Injectable()
export class AllosService {

  constructor(private apiService: ApiService) {
  }

  getAllAllos() {
    return this.apiService.get("/all-allo");
  }

  getActiveAlloForId(id) {
    return this.apiService.get("/allo-active/"+id);
  }

  getActiveAllos() {
    return this.apiService.get("/allo-active");
  }

}
