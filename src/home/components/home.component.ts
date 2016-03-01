import {Component} from 'angular2/core';
import {NgFor, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';
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

  constructor(public gh: GithubInformationService, private _router: Router) {

    this.repos = [];
    this.visible = false;

  }

  onSelect(event, repo) {
    console.log(repo);
    this._router.navigate( ['RepoDetail', { id: repo.id }] );
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
