import {Component, OnInit} from 'angular2/core';
import {NgIf, NgClass} from 'angular2/common';
import {RouteParams} from 'angular2/router';
import {GithubInformationService} from '../../shared/services/github-information.service';
import {StackoverflowInformationService} from '../../shared/services/stackoverflow-information.service';
import 'rxjs/add/operator/merge';

@Component({
  selector: 'sd-detail',
  moduleId: module.id,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  directives: [NgIf, NgClass]
})
export class DetailComponent implements OnInit {
  repo: Object;
  tags: Array<Object>;
  done: Boolean;

  constructor(public so: StackoverflowInformationService, public gh: GithubInformationService, private rp: RouteParams) {
    this.repo = {};
    this.tags = [];
    this.done = false;
  }

  ngOnInit() {
    this.gh.repo(this.rp.get('ownerId'), this.rp.get('repoId')).merge(this.so.tags(this.rp.get('repoId')))
    .subscribe(
      data => {
        if(data.name) {
          this.repo = data;
        } else {
          this.tags = data;
        }
      });
  }
}
