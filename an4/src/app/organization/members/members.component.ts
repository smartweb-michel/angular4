import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MembersDataSource } from '../services/members-datasource.service';
import { MatPaginator } from '@angular/material';
import { DaoService } from '../services/dao.service';
import { GithubService } from '../services/github.service';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, AfterViewInit  {

  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  public loaded = false;
  public membersDatasource: MembersDataSource;

  public constructor(
    private dao: DaoService,
    private gitService: GithubService
  ) { }

  public ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Members per page';
    this.membersDatasource = new MembersDataSource(this.dao, this.paginator, this.gitService);
    this.membersDatasource.members.subscribe((members) => {
      if (members.length > 0) {
        this.loaded = true;
      }
    });
  }

  public ngAfterViewInit() {
    this.membersDatasource.paginator = this.paginator;
  }

}
