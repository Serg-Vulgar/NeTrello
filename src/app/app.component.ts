import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

import '../styles/main.scss';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.dataService.checkData();
  }
}
