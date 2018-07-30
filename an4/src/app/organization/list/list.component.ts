import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CoinsDataSource } from '../services/coins-datasource.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Store } from '@ngrx/store';
import * as CoinsAction from '../../stats/store/actions/getRequests.action';
import * as Reducers from '../../stats/store/reducers/index';
import { PageEvent } from '@angular/material';
import * as Selector from '../../stats/store/selectors/filter-list.selector';

@Component({
  selector: 'app-org-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  public displayColumns = [ 'rank', 'name', 'price', 'marketCap', 'currentSupply', 'volume', 'changeDay', 'action'];
  public coinsDatasource: CoinsDataSource | null | any;
  public test: CoinsDataSource | null | any;
  public coins;
  public coinsLength: any;
  public pageEvent: PageEvent;

  public constructor(
    private router: Router,
    private store: Store<Reducers.IState>,
  ) {
  }
  public ngOnInit() {
    this.store.dispatch(new CoinsAction.GetCoinsData() );

    this.paginator._intl.itemsPerPageLabel = 'Coins per page';
    this.coinsLength  = this.store.select('CoinsData', 'coinslength');
    this.store.select(Selector.getCoins).subscribe(coins => {
      this.coinsDatasource = new MatTableDataSource(coins);
    });
  }
  public goToNextPage($event) {
      this.store.dispatch(new CoinsAction.ChangePage($event));
  }
  public sortData($event) {
    if ($event.direction === '') {
      return;
    }
    this.store.dispatch(new CoinsAction.FieldsFilter($event));
  }

  public ngAfterViewInit() {
    this.coinsDatasource.paginator = this.paginator;
    this.coinsDatasource.sort = this.sort;
  }

  public view = (coin: string) => {
    this.router.navigate(['coins/view/' + coin]);
  }

  public applyFilter(filterValue: string) {
    this.coinsDatasource.filter = filterValue.trim().toLowerCase();
  }
}
