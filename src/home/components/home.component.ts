import {Component} from 'angular2/core';
import {NgFor, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {GithubInformationService} from '../../shared/services/github-information.service';

@Component({
  selector: 'sd-home',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  directives: [NgFor, FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class HomeComponent {
  repos: Array<Object>;

  constructor(public gh: GithubInformationService) {
  }

  /*
   * @param name any text as input.
   */
  search(name: string): any {
    this.gh.search(name).subscribe(repos => this.repos = repos.items);
  }
}
