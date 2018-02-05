import { Injectable } from '@angular/core';

import { ApiService } from "./api.service";

@Injectable()
export class AllosService {

  constructor(private apiService: ApiService) {
  }

  getAllAllos() {
    return this.apiService.get("/all-allo");
  }

  getActiveAllos() {
    return this.apiService.get("/allo-active");
  }

  getAlloForId(id) {
    return this.apiService.get("/allo/"+id);
  }

  postUpdateAllo(id,state) {
    return this.apiService.post("/update-active-allo/"+id,{"state":state})
  }
}
