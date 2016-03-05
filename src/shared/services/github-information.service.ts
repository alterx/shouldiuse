import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {API_URL} from '../../assets/configs/config';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubInformationService {

  constructor(public http: Http) {
  }

  search(name: string) {
    return this.http.get(API_URL + 'repositories?search=' + name).map(res => res.json());
  }

  repo(ownerId: string, repoId: string) {
    return this.http.get(API_URL + 'repository?repoId=' + repoId + '&ownerId=' + ownerId).map(res => res.json());
  }
}
