import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Event } from '../event';

@Component({
  selector: 'app-usm-events',
  templateUrl: './usm-events.component.html',
  styleUrls: ['./usm-events.component.scss']
})
export class UsmEventsComponent implements OnInit {


  displayedColumns: string[] = ['_id', 'category','event_type','alert_type','correspondance'];
  data: Event[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getEvents()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}


