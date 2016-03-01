import {Component, OnInit} from 'angular2/core';
import {NgIf, NgClass} from 'angular2/common';
import {RouteParams} from 'angular2/router';
import {GithubInformationService} from '../../shared/services/github-information.service';
import {ProjectsInformationService} from '../../shared/services/projects-information.service';
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
  projects: Array<Object>;
  done: Boolean;

  constructor(public so: StackoverflowInformationService,
    public gh: GithubInformationService,
    public pr: ProjectsInformationService,
    private rp: RouteParams) {
    this.repo = {};
    this.tags = [];
    this.projects = [];
    this.done = false;
  }

  ngOnInit() {
    this.gh.repo(this.rp.get('ownerId'), this.rp.get('repoId')).merge(
      this.so.tags(this.rp.get('repoId')),
      this.pr.relatedProjects(this.rp.get('repoId'))
      )
    .subscribe(
      data => {
        if(data.name) {
          this.repo = data;
        } else if(data[0].techStack) {
          this.projects = data;
        } else {
          this.tags = data;
        }
      });
  }
}
