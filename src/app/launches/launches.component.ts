import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Launch } from '../models/launch';

import { LaunchService } from '../services/launch.service';

/* TODO:
  - figure out if it's possible to only fetch specific data (it is if using GraphQL instead)
  - add better typing
  - handle errors; add retry logic
  - create & style table to display data
*/

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit {
  launches: Launch[] = [];

  constructor(private launchService: LaunchService) { }

  ngOnInit(): void {
    this.getLaunches();
  }

  private getLaunches(): void {
    this.launchService.getLaunches()
      .pipe(take(1))
      .subscribe(data => {
        for (const launch of data) {
          this.launches.push({
            flight_number: launch.flight_number,
            launch_year: new Date(launch.date_utc).getFullYear(),
            rocket_name: launch.name,
            details: launch.details,
            link: launch.links.presskit,
          });
        }
      });
  }
}
