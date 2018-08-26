import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { DaoService } from './dao.service';
import { MatPaginator, MatSort } from '@angular/material';
import { GithubService } from './github.service';

export class RepositoriesDataSource extends DataSource<any> {

    public _filterChange = new BehaviorSubject('');
    public get filter(): string { return this._filterChange.value; }
    public set filter(filter: string) { this._filterChange.next(filter); }

    public repositories = new BehaviorSubject([]);

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
            this.dao.getRepositories(),
            this._filterChange,
            this.paginator.page,
            this.sort.sortChange
        ];
        return Observable.merge(...displayDataChanges).map(() => {
            let repos = [];
            let result;
            if (this.filter) {
                result = this.getSortData().map((c) => {
                    return c.name.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 ||
                    c.nameWithOwner.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 ? c : false;
                }).filter(Boolean);
            } else {
                result = this.getSortData();
            }
            this.paginator.length = result.length;
            repos = result.slice(this.paginator.pageIndex * this.paginator.pageSize,
              (this.paginator.pageIndex + 1) * this.paginator.pageSize);

              if (repos.length > 0) {
                this.repositories.next(repos);
            }
            return repos;
        });
    }

    public disconnect() {}

    public compare(a, b, isAsc) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    public getSortData = () => {
        let result = this.dao.repositories.value;
        switch (this.sort.active) {
            case 'name':
                if (this.sort.direction === 'desc') {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return b.nameWithOwner.toLowerCase() > a.nameWithOwner.toLowerCase() ? -1 : 1;
                    });
                } else {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return a.nameWithOwner.toLowerCase() > b.nameWithOwner.toLowerCase() ? -1 : 1;
                    });
                }
                break;
            case 'issues':
                if (this.sort.direction === 'desc') {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return b.issues - a.issues;
                    });
                } else {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return a.issues - b.issues;
                    });
                }
                break;
            case 'commits':
                if (this.sort.direction === 'desc') {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return (b.defaultBranchRef ? b.defaultBranchRef.target.history.totalCount : 0) -
                        (a.defaultBranchRef ? a.defaultBranchRef.target.history.totalCount : 0);
                    });
                } else {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return (a.defaultBranchRef ? a.defaultBranchRef.target.history.totalCount : 0) -
                        (b.defaultBranchRef ? b.defaultBranchRef.target.history.totalCount : 0);
                    });
                }
                break;
            case 'milestones':
                if (this.sort.direction === 'desc') {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return b.milestones - a.milestones;
                    });
                } else {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return a.milestones - b.milestones;
                    });
                }
                break;
            case 'projects':
                if (this.sort.direction === 'desc') {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return b.projects - a.projects;
                    });
                } else {
                    result = this.dao.repositories.value.sort((a, b ) => {
                        return a.projects - b.projects;
                    });
                }
                break;
            case 'pullRequests':
                if (this.sort.direction === 'desc') {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return b.pullRequests - a.pullRequests;
                    });
                } else {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return a.pullRequests - b.pullRequests;
                    });
                }
                break;
            case 'releases':
                if (this.sort.direction === 'desc') {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return b.releases - a.releases;
                    });
                } else {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return a.releases - b.releases;
                    });
                }
                break;
            case 'stargazers':
                if (this.sort.direction === 'desc') {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return b.stargazers - a.stargazers;
                    });
                } else {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return a.stargazers - b.stargazers;
                    });
                }
                break;
            case 'watchers':
                if (this.sort.direction === 'desc') {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return b.watchers - a.watchers;
                    });
                } else {
                    result = this.dao.repositories.value.sort((a, b) => {
                        return a.watchers - b.watchers;
                    });
                }
                break;
        }
        return result;
    }
}
