import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Launch } from '../models/launch';
import { LaunchService } from '../services/launch.service';

/* TODO:
  - handle errors; add retry logic
*/
const LAUNCHES_DATA: Launch[] = [];

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Launch>([]);
  displayedColumns = ['flight_number', 'launch_year', 'rocket_name', 'details'];

  constructor(
    private launchService: LaunchService,
  ) { }

  ngOnInit(): void {
    this.getLaunches();
  }

  openLink(launch: Launch): void {
    if (!launch.link) return;

    window.open(launch.link);
  }

  private getLaunches(): void {
    this.launchService.getLaunches()
      .pipe(take(1))
      .subscribe(data => {
        for (const launch of data) {
          LAUNCHES_DATA.push({
            flight_number: launch.flight_number,
            launch_year: new Date(launch.date_utc).getFullYear(),
            rocket_name: launch.name,
            details: launch.details,
            link: launch.links.presskit,
          });
        }

        this.dataSource.data = LAUNCHES_DATA;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}
