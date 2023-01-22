import { Observer } from "../../entities/observer";

export class ObserverFactory<K extends { [key: string]: Function }> {
  public CreateObserver<A extends keyof K & string>(event: A, callback: K[A]) {
    const observer = new Observer<A, K[A]>(event, callback);

    return observer;
  }
}
