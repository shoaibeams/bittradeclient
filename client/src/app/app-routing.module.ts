import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// import {AuthComponent} from './auth/auth.component';
// import {LoginComponent} from './auth/login/login.component';

const routes: Routes = [
//   { path: 'consulting', loadChildren: './components/consulting/consulting.module#ConsultingModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
