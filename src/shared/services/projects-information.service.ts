import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {API_URL} from '../../assets/configs/config';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectsInformationService {

  constructor(public http: Http) {
  }

  relatedProjects(name: string) {
    return this.http.get(API_URL + 'projects?search=' + name).map(res => res.json());
  }
}
