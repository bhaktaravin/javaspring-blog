import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { EventData } from './event';
import { filter, map} from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class EventbusService {

  private subject$ = new Subject<EventData>(); 

  emit(event: EventData){
    this.subject$.next(event);
  }

  on(eventName: string, action: any):Subscription {
    return this.subject$.pipe(
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e["value"])).subscribe(action);
  }
}
