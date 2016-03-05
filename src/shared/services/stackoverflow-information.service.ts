import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {API_URL} from '../../assets/configs/config';
import 'rxjs/add/operator/map';

@Injectable()
export class StackoverflowInformationService {

  constructor(public http: Http) {
  }

  tags(name: string) {
    return this.http.get(API_URL + 'stackoverflow?search=' + name).map(res => res.json());
  }
}
