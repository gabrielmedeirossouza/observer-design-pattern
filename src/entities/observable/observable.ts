import { Observer } from '../observer';
import type { Event, Callback } from '../observer';

type ObserverMap = {
  [key: Event]: Callback
};
type EventOf<T> = keyof T & Event;
type CallbackOf<T> = T[keyof T] & Callback;
type ObserverOf<T extends ObserverMap> = Observer<EventOf<T>, CallbackOf<T>>

/**
 * @description Observable entity that can be observed by observers.
 * @param T The observer map that defines the events and callbacks. The key must be a string that starts with "on-" and the value must be a callback. Example: { "on-change": (value: number) => void; }
 */
export class Observable<T extends ObserverMap> {
  private _observers: ObserverOf<T>[] = [];

  public get Observers(): ObserverOf<T>[] {
    return this._observers;
  }

  public Subscribe(observer: ObserverOf<T>): ObserverOf<T> {
    this._observers.push(observer);

    return observer;
  }

  public Unsubscribe(observer: ObserverOf<T>): void {
    const index = this._observers.indexOf(observer);

    if (index !== -1) {
      this._observers.splice(index, 1);
    }
  }

  public Notify<A extends EventOf<T>>(event: A, ...args: Parameters<T[A]>): void {
    this._observers.forEach(observer => {
      if (observer.event === event) {
        observer.callback(...args);
      }
    });
  }
}
