import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { DemoComponent } from 'app/demo/demo.component';
import { GridComponent } from 'app/demo/widget/grid/grid.component';
import { MaterialComponent } from 'app/demo/material/material.component';
import { NgBootstrapComponent } from 'app/demo/ng-bootstrap/ng-bootstrap.component';

const MyRoute: Routes =
[
  { path: 'demo' , component: DemoComponent },
  { path: 'demo/grid' , component: GridComponent },
  { path: 'demo/material' , component: MaterialComponent },
  { path: 'demo/ngb' , component: NgBootstrapComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(MyRoute, {useHash: true})
  ],
  exports: [
    RouterModule
  ]

})
export class DemoRoutingModule {

}
