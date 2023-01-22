import { Observer } from '../observer';

type ObserverMap = {
  [key: string]: (...args: any[]) => void
};
type EventOf<T> = keyof T & string;
type CallbackOf<T> = T[keyof T];
type ObserverOf<T extends ObserverMap> = Observer<EventOf<T>, CallbackOf<T>>

export class Observable<T extends { [key: string]: (...args: any[]) => void }> {
  private _observers: ObserverOf<T>[] = [];

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

  public Notify<A extends keyof T & string>(event: A, ...args: Parameters<T[A]>): void {
    this._observers.forEach(observer => {
      if (observer.event === event) {
        observer.callback(...args);
      }
    });
  }
}
