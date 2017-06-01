import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SortablejsModule } from 'angular-sortablejs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent }  from './app.component';

import { StartScreenComponent }  from '../components/start-screen/start-screen.component';
import { DashboardComponent }  from '../components/dashboard/dashboard.component';
import { BoardComponent }  from '../components/board/board.component';
import { ColumnComponent }  from '../components/column/column.component';
import { CardComponent }  from '../components/card/card.component';
import { CardInfoComponent } from '../components/card/card-info/card-info.component';

import { DataService } from '../services/data.service';

import { DialogModule } from '../components/dialog/dialog.module';


import { ClickOutsideDirective } from '../directives/click-outside.directive'
import { FocusDirective } from '../directives/focus.directive'
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SortablejsModule,
    MaterialModule,
    BrowserAnimationsModule,
    DialogModule,
    DragulaModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    BoardComponent,
    ColumnComponent,
    CardComponent,
    CardInfoComponent,
    StartScreenComponent,
    ClickOutsideDirective,
    FocusDirective
  ],
  entryComponents: [
    CardInfoComponent
  ],
  bootstrap: [AppComponent],
  providers: [DataService]
})
export class AppModule {
}
