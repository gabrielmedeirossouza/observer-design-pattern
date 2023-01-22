import { ObserverFactory } from './observer-factory'
import { Observer } from '../../entities/observer'

type ObserverMap = {
  "on-test": (arg: string) => void
}

it("should create an observer", () => {
  const observer = new ObserverFactory<ObserverMap>().CreateObserver("on-test", () => {});

  expect(observer).toBeInstanceOf(Observer);
  expect(observer.event).toBe("on-test");
  expect(observer.callback).toBeDefined();
})
