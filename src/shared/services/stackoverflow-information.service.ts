import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';

@Injectable()
export class StackoverflowInformationService {

  constructor(public http: Http) {
  }

  tags(name: string) {
    return this.http.get('http://localhost:8000/api/stackoverflow?search=' + name).map(res => res.json());
  }
}
