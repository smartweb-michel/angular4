import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DaoService {

  public coins: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public onlineCoins: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public offlineCoins: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public organizations: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public repositories: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public members: BehaviorSubject<any[]> = new BehaviorSubject([]);

  public constructor(
    private db: AngularFirestore
  ) {
    this.getCoins().subscribe((coins) => {
      this.coins.next(coins);
    });
    this.getOnlineCoins().subscribe((coins) => {
      this.onlineCoins.next(coins);
    });
    this.getOfflineCoins().subscribe((coins) => {
      this.offlineCoins.next(coins);
    });
    this.getOrganizations().subscribe((orgs) => {
      this.organizations.next(orgs);
    });
    this.getRepositories().subscribe((repos) => {
      this.repositories.next(repos);
    });
    this.getMembers().subscribe((members) => {
      this.members.next(members);
    });
  }

  public getCoins = () => {
    return this.db.collection('cml-coins', ref => ref.orderBy('finance.rank', 'asc')).valueChanges();
  };

  public getOnlineCoins = () => {
    return this.db.collection('cml-coins',
      ref => ref.where('gitStatus.synced', '==', true)
        .orderBy('finance.rank', 'asc')).valueChanges();
      };

  public getOfflineCoins = () => {
    return this.db.collection('cml-coins',
      ref => ref.where('gitStatus.synced', '==', false)
        .orderBy('finance.rank', 'asc')).valueChanges();
  };

  public getCoin = (label: string) => {
    return this.db.collection('cml-coins').doc(label).valueChanges();
  };

  public getMarketData = () => {
    return this.db.collection('cml-market', ref => ref.orderBy('timestamp', 'desc').limit(1)).valueChanges();
  };

  public getOrganizations = () => {
    return this.db.collection('cml-git-organizations',
      ref => ref.where('isOnline', '==', true).orderBy('github.stargazers', 'desc')).valueChanges();
  };
  public getOrganization = () => {
    return this.db.collection('cml-git-organizations', ref => ref.orderBy('github.stargazers', 'desc')).valueChanges();
  };

  public getRepositories = () => {
    return this.db.collection('cml-git-repositories', ref => ref.orderBy('stargazers', 'desc')).valueChanges();
  };

  public getMembers = () => {
    return this.db.collection('cml-git-members', ref => ref.orderBy('stargazers', 'desc')).valueChanges();
  };
}
