import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  get(path: string) {

      return this.http.get(path);
  }

  post(path: string, body) {

    return this.http.post(path,body);
  }

}
