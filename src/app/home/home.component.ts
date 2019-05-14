import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
   user: string;
  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.cast.subscribe(user => this.user = user);
  }
}
