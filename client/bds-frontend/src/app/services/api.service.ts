import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiService {

  prefix : string = "/api";
  domain : string = "http://127.0.0.1:3000";
  //TODO add domain in a config file and import it

  constructor(private http: HttpClient) {
  }

  get(path: string) {

      return this.http.get(this.domain+this.prefix+path);
  }

  post(path: string, body) {

    return this.http.post(this.domain+this.prefix+path,body);
  }

}
