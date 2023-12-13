import {NgModule} from '@angular/core';
import {NoPreloading, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';

const routes: Routes = [{path: '', loadChildren: () => import('./pages/main.module').then(m => m.MainPageModule)}];

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
