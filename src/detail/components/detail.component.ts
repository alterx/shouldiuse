import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {GithubInformationService} from '../../shared/services/github-information.service';
import {StackoverflowInformationService} from '../../shared/services/stackoverflow-information.service';


@Component({
  selector: 'sd-detail',
  moduleId: module.id,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  repo: Object;
  tags: Array<Object>;

  constructor(public so: StackoverflowInformationService, public gh: GithubInformationService, private rp: RouteParams) {

  }

  ngOnInit() {
    this.gh.repo(this.rp.get('ownerId'), this.rp.get('repoId')).subscribe(repo =>  this.repo = repo );
    this.so.tags(this.rp.get('repoId')).subscribe(tags =>  this.tags = tags );
  }
}
