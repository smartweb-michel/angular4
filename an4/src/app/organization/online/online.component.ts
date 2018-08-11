import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import * as OrganisationAction from '../../stats/store/actions/getOrganization.action';
import * as Reducers from '../../stats/store/reducers/index';
import * as Selector from '../../stats/store/selectors/filter-oraganization.selector';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss']
})
export class OnlineComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;

  public displayColumns =
    ['name', 'resourcePath', 'slug', 'commits',
      'issues', 'milestones', 'projects', 'pullRequests', 'releases', 'stargazers', 'watchers'];
  public loaded = false;
  public coins!: any;
  public status = 'online';
  public oraganizationLength: any;
  public orgsDatasource!: any;

  public constructor(
    private store: Store<Reducers.IState>,
    private router: Router,
  ) {
  }

  public ngOnInit() {
    this.store.dispatch(new OrganisationAction.GetOrganisation());

    this.paginator._intl.itemsPerPageLabel = 'Organizations per page';
    this.oraganizationLength = this.store.select('GetOrganization', 'organizationLength');
    this.store.select(Selector.oraganization).subscribe( organiz => {
      this.orgsDatasource = new MatTableDataSource(organiz);
    });
  }

  public ngAfterViewInit() {
    this.orgsDatasource.paginator = this.paginator;
    this.orgsDatasource.sort = this.sort;
  }

  public view = (coin: string) => {
    this.router.navigate(['coins/view/' + coin]);
  };

  public applyFilter(filterValue: string) {
    this.orgsDatasource.filter = filterValue.trim().toLowerCase();
  }
  public sortData($event) {
    if ($event.direction === '') {
      return;
    }
    this.store.dispatch(new OrganisationAction.FieldFilter($event));
  }

}
