import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';
import {NavigatorService} from './core/services/navigator/navigator.service';
import {AppRoutingModule} from './app-routing.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {isSafari} from './core/constants';
import {AppTranslocoModule} from './core/modules/transloco/transloco.module';
import {AppNgxsModule} from './core/modules/ngxs/ngxs.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {fakeBackendProvider} from './core/helpers/fake-backend';
import {JwtInterceptor} from './core/helpers/jwt.interceptor';
import {ErrorInterceptor} from './core/helpers/error.interceptor';
const mode = isSafari ? 'ios' : 'md';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    AppNgxsModule,
    IonicModule.forRoot({mode}),
    AppRoutingModule,
    AppTranslocoModule,
    FormsModule,
    ReactiveFormsModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    NavigatorService,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
