import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject } from "rxjs";

@Injectable()
export class CheckSubscribedService {
  isSubscribed = new ReplaySubject(0);
  isPlanExpired = new ReplaySubject(0);

  constructor() {}

  changeSubscriptionState(state) {
    this.isSubscribed.next(state);
  }

  changePlanState(state) {
    this.isPlanExpired.next(state);
  }
}
