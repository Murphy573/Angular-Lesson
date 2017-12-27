/**
 * write by @pengfei.li
 */
import {NgModule} from "@angular/core";
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule(
  {
    imports: [RouterModule.forRoot(routes, {enableTracing: false, useHash: true})], //调试用此配置
    exports: [RouterModule]
  }
)
export class AppRouting {

}
