import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { LaunchService } from '../services/launch.service';

/* TODO:
  - figure out if it's possible to only fetch specific data
  - add better typing
  - handle errors; add retry logic
  - format data for UI
  - create & style table to display data
*/

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit {
  launches: any[] | undefined;

  constructor(private launchService: LaunchService) { }

  ngOnInit(): void {
    this.getLaunches();
  }

  private getLaunches(): void {
    this.launchService.getLaunches()
      .pipe(take(1))
      .subscribe(data => {
        console.log('data: ', data);
      });
  }
}
