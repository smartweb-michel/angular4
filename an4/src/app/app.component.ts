import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import * as CoinsAction from './stats/store/actions/getRequests.action';
import * as MarketAction from './stats/store/actions/getMarketdata.action';
import * as Reducers from './stats/store/reducers/index';
import * as MemberAction from './stats/store/actions/member.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') public sidenav!: MatSidenav;

  public menuLink;
  public viewLink;
  public marketData$;
  public coinsDataCount$;
  public coinsDataOnline$;
  public coinsData = {};

  public constructor(
    private store: Store<Reducers.IState>,
    private location: Location,
    private router: Router
  ) {}

  public ngOnInit() {
    this.store.dispatch(new MarketAction.GetData());
    this.store.dispatch(new CoinsAction.GetCoinsOnlineData() );
    this.store.dispatch(new MemberAction.GetMember());

    this.marketData$ = this.store.select('GetMarket', 'marketData');
    this.coinsDataCount$  = this.store.select('CoinsData', 'coinslength');
    this.coinsDataOnline$  =  this.store.select('CoinsData', 'onlineCoinslength');
    this.router.events.subscribe(() => {
      this.menuLink = this.location.path(true).trim().split('/')[1];
      this.viewLink = this.location.path(true).trim().split('/')[2];
    });
  }

  public close() {
    this.sidenav.close();
  }
}
