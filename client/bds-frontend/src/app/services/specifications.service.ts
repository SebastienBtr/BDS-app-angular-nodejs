import { Injectable } from '@angular/core';

import { ApiService } from "./api.service";

@Injectable()
export class SpecificationsService {

  constructor(private apiService: ApiService) {
  }

  getSpecsForAlloId(alloId) {
    return this.apiService.get("/specifications/"+alloId);
  }

  getSpecWithId(id) {
    return this.apiService.get("/specification/"+id);
  }
}
