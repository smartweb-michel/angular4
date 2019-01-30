import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, publishReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  public SERVER_URL = 'http://localhost:3000/';
  public constructor(
    private http: HttpClient,
    private db: AngularFirestore
  ) {}

  public syncGithubOrganization = (orgSlug: string, orgId: number, login: string) => {
    const url = this.SERVER_URL + 'org/' + orgId + '/' + login + '/' + orgSlug;

    this.http.get(url).pipe (
      map((res: Response) => res),
      publishReplay(1),
      refCount()
    ).subscribe((response: any) => {
      if (response && response.requestId) {
        this.db.collection('cml-coins').doc(orgSlug).update({
          gitStatus: {
            synced: false,
            syncing: true,
            available: true,
            requestId: response.requestId
          }
        });
      }
    });
  }

  public requestGithubOrganization = (orgSlug: string, orgId: number, login: string) => {
    const request = {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      resource: 0,
      type: 0,
      status: 0,
      priority: 1,
      trial: 0,
      data: [
        {
          key:  'login ',
          value: login
        },
        {
          key: 'orgId ',
          value: orgId
        },
        {
          key: 'slug ',
          value: orgSlug
        }
      ]
    };

    return this.db.collection('cml-pool-requests').add(request).then((doc) => {
      if (doc.id) {
        this.db.collection('cml-coins').doc(orgSlug).set({
          gitStatus: {
            synced: false,
            syncing: true,
            requestId: doc.id
          }
        }, {merge: true});
      }
    });
  }


}
