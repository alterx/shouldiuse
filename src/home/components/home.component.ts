import {Component} from 'angular2/core';
import {NgFor, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {GithubInformationService} from '../../shared/services/github-information.service';

@Component({
  selector: 'sd-home',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  directives: [NgFor, NgClass, FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class HomeComponent {
  repos: Array<Object>;
  visible: Boolean;

  constructor(public gh: GithubInformationService) {
    this.repos = [];
    this.visible = false;
  }

  /*
   * @param name any text as input.
   */
  search(keyCode, name: string): any {
    if(!keyCode || keyCode === 13) {
      this.gh.search(name).subscribe(repos => {
        this.repos = repos.items;
        this.visible = true;
      });
    }
  }
}
