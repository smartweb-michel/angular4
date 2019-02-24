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

  public getOrganization = (login: string) => {
    return this.db.collection('cml-git-organizations').doc(login.toLowerCase()).valueChanges();
  }

  public getOrganizationById = (cmcId: number) => {
    return this.db.collection('cml-git-organizations', ref => ref.where('cmcId', '==', cmcId)).valueChanges();
  }

  public getRepositoriesOfOrganization = (orgId: string) => {
    return this.db.collection('cml-git-repositories',
    ref => ref.where('organization', '==', orgId).orderBy('stargazers', 'desc')).valueChanges();
  }

  public getMembersOfOrganization = (login: string) => {
    return this.db.collection('cml-git-members',
    ref => ref.where('organization', '==', login).orderBy('followers', 'desc')).valueChanges();
  }

  public getGitPoolRequest = (requestId: string) => {
    return this.db.collection('cml-pool-requests').doc(requestId).valueChanges();
  }

  public linkGithubOrganization = (slug: string, login: string) => {
    return this.db.collection('cml-coins').doc(slug).update({
      gitStatus: {
        synced: true,
        syncing: false,
        available: true
      }
    })
    .then(() => {
      return this.db.collection('cml-git-organizations').doc(login.toLowerCase()).update({isOnline: true});
    });
  }

  public retryGithubSync = (requestId: string) => {
    return this.db.collection('cml-pool-requests').doc(requestId).update({
      status: 0,
      trial: 0
    });
  }

  public cancelGithubSync = (slug: string) => {
    return this.db.collection('cml-coins').doc(slug).update({
      gitStatus: {
        synced: false,
        syncing: false,
        available: true
      }
    });
  }

  public disableGithub = (slug: string) => {
    return this.db.collection('cml-coins').doc(slug).update({
      gitStatus: {
        synced: false,
        syncing: false,
        available: false
      }
    });
  }

  public enableGithub = (slug: string) => {
    return this.db.collection('cml-coins').doc(slug).update({
      gitStatus: {
        synced: false,
        syncing: false,
        available: true
      }
    });
  }

  public updateOrganizationWebsite = (orgLogin: string, websiteUrl: string) => {
    return this.db.collection('cml-git-organizations').doc(orgLogin)
    .set({
      websiteUrl
    }, {merge: true})
    .then(() => {
      const url = this.SERVER_URL + 'org/website-update/' + orgLogin;
      return this.http.get(url);
    });
  }
}
