import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public loading = false;

  public constructor() { }

  public ngOnInit() {

  }

  public toogle = () => {
    this.loading = !this.loading;
  }

  public set = (loading: boolean) => {
    this.loading = loading;
  }

}
