import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }  from './app.component';

import { DashboardModule } from '../components/dashboard/dashboard.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DashboardModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}

