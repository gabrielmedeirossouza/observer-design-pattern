import { Observer } from "../../entities/observer";
import type { Event, Callback } from "../../entities/observer";

type ObserverMap = {
  [key: Event]: Callback;
};

type EventOf<T> = keyof T & Event;

/**
 * @description Factory for Observer entity.
 */
export class ObserverFactory<K extends ObserverMap> {

  /**
   * @description Creates an observer for the given event and callback. The observer is not automatically subscribed to the observable, you have to do that manually.
   * @param event Must be a string that starts with "on-"
   * @param callback The callback that will be called when the event is triggered
   */
  public CreateObserver<A extends EventOf<K>>(event: A, callback: K[A]) {
    const observer = new Observer<A, K[A]>(event, callback);

    return observer;
  }
}
