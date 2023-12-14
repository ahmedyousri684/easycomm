import {NgModule} from '@angular/core';
import {NoPreloading, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {AuthGuard} from './core/helpers/auth.guard';

const routes: Routes = [
  {path: '', loadChildren: () => import('./pages/main.module').then(m => m.MainPageModule), canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: SignupComponent},

  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: environment.initialNavigation,
      preloadingStrategy: NoPreloading,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
