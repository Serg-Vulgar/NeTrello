import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortablejsModule } from 'angular-sortablejs';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { DragScrollModule } from 'angular2-drag-scroll';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent }  from './dashboard.component';
import { StartScreenComponent }  from '../start-screen/start-screen.component';
import { BoardComponent }  from '../board/board.component';
import { ColumnComponent }  from '../column/column.component';
import { CardComponent }  from '../card/card.component';
import { CardInfoComponent } from '../card/card-info/card-info.component';

import { DataService } from '../../services/data.service';
import { DialogModule } from '../dialog/dialog.module';

import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { FocusDirective } from '../../directives/focus.directive';

import {GetInitialsPipe} from '../../pipes/getinitials.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SortablejsModule,
    MaterialModule,
    MdNativeDateModule,
    DialogModule,
    DashboardRoutingModule,
    DragScrollModule
  ],
  declarations: [
    DashboardComponent,
    BoardComponent,
    ColumnComponent,
    CardComponent,
    CardInfoComponent,
    StartScreenComponent,
    ClickOutsideDirective,
    FocusDirective,
    GetInitialsPipe
  ],
  entryComponents: [
    CardInfoComponent
  ],
  providers: [DataService],
  exports: [DashboardComponent]
})
export class DashboardModule {
}

