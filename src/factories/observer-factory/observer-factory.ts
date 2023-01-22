import { Observer } from "../../entities/observer";

export function ObserverFactory<K extends { [key: string]: Function }>() {
  function createObserver<A extends keyof K & string>(event: A, callback: K[A]) {
    const observer = new Observer<A, K[A]>(event, callback);

    return observer;
  }

  return {
    createObserver
  };
}
