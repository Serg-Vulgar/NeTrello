import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StartScreenComponent } from '../components/start-screen/start-screen.component'
import { BoardComponent } from '../components/board/board.component'

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/start',
        pathMatch: 'full'
      },
      {
        path: 'start',
        component: StartScreenComponent
      },
      {
        path: 'board/:id',
        component: BoardComponent
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
