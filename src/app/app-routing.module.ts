import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablasComponent} from './tablas/tablas.component';

const routes: Routes = [
  {
    path: '', component: TablasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
