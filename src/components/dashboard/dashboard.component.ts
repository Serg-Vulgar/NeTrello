import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Board } from '../../services/data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  boards: Array<Board>;

  constructor(private router: Router,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.checkData();
    this.boards = this.dataService.boards;
  }

  openStartPage() {
    this.router.navigate(['/start']);
  }

  openBoard(id: number) {
    this.router.navigate(['/board', id]);
  }

  updateBoards() {
    this.boards = this.dataService.boards;
  }
}
