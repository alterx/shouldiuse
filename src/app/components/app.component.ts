import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {HomeComponent} from '../../home/components/home.component';
import {DetailComponent} from '../../detail/components/detail.component';
import {FooterComponent} from '../../app/components/footer.component';

@Component({
  selector: 'sd-app',
  viewProviders: [],
  moduleId: module.id,
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, FooterComponent]
})
@RouteConfig([
  { path: '/',      name: 'Home',  component: HomeComponent  },
  { path:'/repo/:ownerId/:repoId', name: 'RepoDetail', component: DetailComponent}
])
export class AppComponent {}
