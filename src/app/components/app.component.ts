import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {HomeComponent} from '../../home/components/home.component';
import {AboutComponent} from '../../about/components/about.component';

@Component({
  selector: 'sd-app',
  viewProviders: [],
  moduleId: module.id,
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/',      name: 'Home',  component: HomeComponent  },
  { path: '/about', name: 'About', component: AboutComponent }
])
export class AppComponent {}
