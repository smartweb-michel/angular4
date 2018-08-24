import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { DaoService } from './dao.service';
import { MatPaginator } from '@angular/material';
import { GithubService } from './github.service';

export class MembersDataSource extends DataSource<any> {

  public _filterChange = new BehaviorSubject('');

  public get filter(): string {
    return this._filterChange.value;
  }

  public set filter(filter: string) {
    this._filterChange.next(filter);
  }

  public members = new BehaviorSubject([]);

  public constructor(
    private dao: DaoService,
    public paginator: MatPaginator,
    public gitService: GithubService
  ) {
    super();
  }

  public connect(): Observable<any[]> {
    const displayDataChanges = [
      this.dao.getMembers(),
      this._filterChange,
      this.paginator.page
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      let members = [];
      let result;
      if (this.filter) {
        result = this.getSortData().map((c) => {
          return c.name.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 ? c : false;
        }).filter(Boolean);
      } else {
        result = this.getSortData();
      }
      this.paginator.length = result.length;
      members = result.slice(this.paginator.pageIndex * this.paginator.pageSize,
        (this.paginator.pageIndex + 1) * this.paginator.pageSize);

      if (members.length > 0) {
        this.members.next(members);
      }

      return members;
    });


  }

  public disconnect() {
  }

  public compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public getSortData = () => {
    const result = this.dao.members.value;

    return result;
  };
}
