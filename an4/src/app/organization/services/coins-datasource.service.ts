import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { DaoService } from './dao.service';
import { MatPaginator, MatSort } from '@angular/material';
import { GithubService } from './github.service';

export class CoinsDataSource extends DataSource<any> {

    public _filterChange = new BehaviorSubject('');
    public get filter(): string { return this._filterChange.value; }
    public set filter(filter: string) { this._filterChange.next(filter); }

    public coins = new BehaviorSubject([]);

    public constructor(
        private dao: DaoService,
        public paginator: MatPaginator,
        public sort: MatSort,
        public gitService: GithubService
    ) {
        super();
    }

    public connect(): Observable<any[]> {
        const displayDataChanges = [
            this.dao.getCoins(),
            this._filterChange,
            this.paginator.page,
            this.sort.sortChange
        ];
        return Observable.merge(...displayDataChanges).map(() => {
            let coins = [];
            let result;
            if (this.filter) {
                result = this.getSortData().map((c) => {
                    return c.name.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 ||
                    c.slug.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 ||
                    c.symbol.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 ? c : false;
                }).filter(Boolean);
            } else {
                result = this.getSortData();
            }
            this.paginator.length = result.length;
            coins = result.slice (
              this.paginator.pageIndex * this.paginator.pageSize,
              (this.paginator.pageIndex + 1) *
              this.paginator.pageSize);

            if (coins.length > 0) {
                this.coins.next(coins);
            }

            return coins;
        });
    }

    public disconnect() {}

    public compare(a, b, isAsc) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    public getSortData = () => {
        let result = this.dao.coins.value;
        switch (this.sort.active) {
            case 'rank':
                if (this.sort.direction === 'desc') {
                    result = this.dao.coins.value.sort((a, b) => {
                        return b.finance.rank - a.finance.rank;
                    });
                } else {
                    result = this.dao.coins.value.sort((a, b) => {
                        return a.finance.rank - b.finance.rank;
                    });
                }
                break;
            case 'name':
                if (this.sort.direction === 'desc') {
                    result = this.dao.coins.value.sort((a, b) => {
                        return b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 1;
                    });
                } else {
                    result = this.dao.coins.value.sort((a, b) => {
                        return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1;
                    });
                }
                break;
            case 'price':
                if (this.sort.direction === 'desc') {
                    result = this.dao.coins.value.sort((a, b) => {
                        return b.finance.price - a.finance.price;
                    });
                } else {
                    result = this.dao.coins.value.sort((a, b) => {
                        return a.finance.price - b.finance.price;
                    });
                }
                break;
            case 'marketCap':
                if (this.sort.direction === 'desc') {
                    result = this.dao.coins.value.sort((a, b) => {
                        return b.finance.marketCap - a.finance.marketCap;
                    });
                } else {
                    result = this.dao.coins.value.sort((a, b) => {
                        return a.finance.marketCap - b.finance.marketCap;
                    });
                }
                break;
            case 'currentSupply':
                if (this.sort.direction === 'desc') {
                    result = this.dao.coins.value.sort((a, b) => {
                        return b.finance.currentSupply - a.finance.currentSupply;
                    });
                } else {
                    result = this.dao.coins.value.sort((a, b) => {
                        return a.finance.currentSupply - b.finance.currentSupply;
                    });
                }
                break;
            case 'volume':
                if (this.sort.direction === 'desc') {
                    result = this.dao.coins.value.sort((a, b) => {
                        return b.finance.volume - a.finance.volume;
                    });
                } else {
                    result = this.dao.coins.value.sort((a, b) => {
                        return a.finance.volume - b.finance.volume;
                    });
                }
                break;
            case 'changeDay':
                if (this.sort.direction === 'desc') {
                    result = this.dao.coins.value.sort((a, b) => {
                        return b.finance.changeDay - a.finance.changeDay;
                    });
                } else {
                    result = this.dao.coins.value.sort((a, b) => {
                        return a.finance.changeDay - b.finance.changeDay;
                    });
                }
                break;
        }
        return result;
    }
}
