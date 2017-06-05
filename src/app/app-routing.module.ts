import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/start',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '/start'
      },
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
