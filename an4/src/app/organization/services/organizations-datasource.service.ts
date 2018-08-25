import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { DaoService } from './dao.service';
import { MatPaginator, MatSort } from '@angular/material';
import { GithubService } from './github.service';

export class OrganizationsDataSource extends DataSource<any> {

  public _filterChange = new BehaviorSubject('');

  public get filter(): string {
    return this._filterChange.value;
  }

  public set filter(filter: string) {
    this._filterChange.next(filter);
  }

  public orgs = new BehaviorSubject([]);

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
      this.dao.getOrganizations(),
      this._filterChange,
      this.paginator.page,
      this.sort.sortChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      let result = [];
      if (this.filter) {
        result = this.getSortData().map((c) => {
          return c.name.toLowerCase()
            .indexOf(this.filter.toLowerCase()) !== -1 || c.slug.toLowerCase()
            .indexOf(this.filter.toLowerCase()) !== -1 || c.login.toLowerCase()
            .indexOf(this.filter.toLowerCase()) !== -1 ? c : false;
        }).filter(Boolean);
      } else {
        result = this.getSortData();
      }
      this.paginator.length = result.length;
      const list = result.slice(this.paginator.pageIndex * this.paginator.pageSize,
        (this.paginator.pageIndex + 1) * this.paginator.pageSize);
      if (list.length > 0) {
        this.orgs.next(list);
      }
      return list;
    });
  }

  public disconnect() {
  }

  public compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public getSortData = () => {
    let result = this.dao.organizations.value;
    switch (this.sort.active) {
      case 'name':
        if (this.sort.direction === 'desc') {
          result = this.dao.organizations.value.sort((a, b) => {
            return b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 1;
          });
        } else {
          result = this.dao.organizations.value.sort((a, b) => {
            return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1;
          });
        }
        break;
      case 'repositories':
        if (this.sort.direction === 'desc') {
          result = this.dao.organizations.value.sort((a, b) => {
            return b.repositoriesCount - a.repositoriesCount;
          });
        } else {
          result = this.dao.organizations.value.sort((a, b) => {
            return a.repositoriesCount - b.repositoriesCount;
          });
        }
        break;
      case 'members':
        if (this.sort.direction === 'desc') {
          result = this.dao.organizations.value.sort((a, b) => {
            return b.membersCount - a.membersCount;
          });
        } else {
          result = this.dao.organizations.value.sort((a, b) => {
            return a.membersCount - b.membersCount;
          });
        }
        break;
      case 'issues':
        if (this.sort.direction === 'desc') {
          result = this.dao.organizations.value.sort((a, b) => {
            return b.github.issues - a.github.issues;
          });
        } else {
          result = this.dao.organizations.value.sort((a, b) => {
            return a.github.issues - b.github.issues;
          });
        }
        break;
      case 'commits':
        if (this.sort.direction === 'desc') {
          result = this.dao.organizations.value.sort((a, b) => {
            return b.github.commits - a.github.commits;
          });
        } else {
          result = this.dao.organizations.value.sort((a, b) => {
            return a.github.commits - b.github.commits;
          });
        }
        break;
      case 'milestones':
        if (this.sort.direction === 'desc') {
          result = this.dao.organizations.value.sort((a, b) => {
            return b.github.milestones - a.github.milestones;
          });
        } else {
          result = this.dao.organizations.value.sort((a, b) => {
            return a.github.milestones - b.github.milestones;
          });
        }
        break;
      case 'projects':
        if (this.sort.direction === 'desc') {
          result = this.dao.organizations.value.sort((a, b) => {
            return b.github.projects - a.github.projects;
          });
        } else {
          result = this.dao.organizations.value.sort((a, b) => {
            return a.github.projects - b.github.projects;
          });
        }
        break;
      case 'pullRequests':
        if (this.sort.direction === 'desc') {
          result = this.dao.organizations.value.sort((a, b) => {
            return b.github.pullRequests - a.github.pullRequests;
          });
        } else {
          result = this.dao.organizations.value.sort((a, b) => {
            return a.github.pullRequests - b.github.pullRequests;
          });
        }
        break;
      case 'releases':
        if (this.sort.direction === 'desc') {
          result = this.dao.organizations.value.sort((a, b) => {
            return b.github.releases - a.github.releases;
          });
        } else {
          result = this.dao.organizations.value.sort((a, b) => {
            return a.github.releases - b.github.releases;
          });
        }
        break;
      case 'stargazers':
        if (this.sort.direction === 'desc') {
          result = this.dao.organizations.value.sort((a, b) => {
            return b.github.stargazers - a.github.stargazers;
          });
        } else {
          result = this.dao.organizations.value.sort((a, b) => {
            return a.github.stargazers - b.github.stargazers;
          });
        }
        break;
      case 'watchers':
        if (this.sort.direction === 'desc') {
          result = this.dao.organizations.value.sort((a, b) => {
            return b.github.watchers - a.github.watchers;
          });
        } else {
          result = this.dao.organizations.value.sort((a, b) => {
            return a.github.watchers - b.github.watchers;
          });
        }
        break;
    }

    return result;
  };
}
