import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectsInformationService {

  constructor(public http: Http) {
  }

  relatedProjects(name: string) {
    return this.http.get('http://localhost:8000/api/projects?search=' + name).map(res => res.json());
  }
}
