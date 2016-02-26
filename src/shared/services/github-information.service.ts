import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubInformationService {

  constructor(public http: Http) {
  }

  search(name: string) {
    return this.http.get('http://localhost:8000/api/repositories?search=' + name).map(res => res.json());
  }
}
