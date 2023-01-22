import { vi } from 'vitest'
import { Observer } from '../observer'
import { Observable } from './observable'

const CALLBACK_MOCK = (arg: string) => arg

type ObserverMap = {
  "on-test": (arg: string) => void
  "on-test-2": (arg: string) => void
}

it("should subscribe an observer", () => {
  const observable = new Observable<ObserverMap>();
  const observer = new Observer("on-test", () => {});
  const result = observable.Subscribe(observer);

  expect(result).toBe(observer);
  expect(observable.Observers).toContain(observer);
  expect(observable.Observers.length).toBe(1);
})

it("should unsubscribe an observer", () => {
  const observable = new Observable<ObserverMap>();
  const observer = new Observer("on-test", () => {});
  observable.Subscribe(observer);
  observable.Unsubscribe(observer);

  expect(observable.Observers).not.toContain(observer);
  expect(observable.Observers.length).toBe(0);
})

it("should notify an observer", () => {
  const callback = vi.fn(CALLBACK_MOCK);
  const observable = new Observable<ObserverMap>();
  const observer = new Observer("on-test", callback);

  observable.Subscribe(observer);
  observable.Notify("on-test", "test");

  expect(callback).toHaveBeenCalledWith("test");
  callback.mockClear();
})

it("should notify all observers", () => {
  const callback1 = vi.fn(CALLBACK_MOCK);
  const callback2 = vi.fn(CALLBACK_MOCK);
  const observable = new Observable<ObserverMap>();
  const observer1 = new Observer("on-test", callback1);
  const observer2 = new Observer("on-test", callback2);

  observable.Subscribe(observer1);
  observable.Subscribe(observer2);
  observable.Notify("on-test", "test");

  expect(callback1).toHaveBeenCalledWith("test");
  expect(callback2).toHaveBeenCalledWith("test");
  callback1.mockClear();
  callback2.mockClear();
})

it("should notify only observers with the same event", () => {
  const callback1 = vi.fn(CALLBACK_MOCK);
  const callback2 = vi.fn(CALLBACK_MOCK);
  const observable = new Observable<ObserverMap>();
  const observer1 = new Observer("on-test", callback1);
  const observer2 = new Observer("on-test-2", callback2);

  observable.Subscribe(observer1);
  observable.Subscribe(observer2);
  observable.Notify("on-test", "test");

  expect(callback1).toHaveBeenCalledWith("test");
  expect(callback2).not.toHaveBeenCalled();
  callback1.mockClear();
  callback2.mockClear();
})

it("should not notify an observer after unsubscribe", () => {
  const callback = vi.fn(CALLBACK_MOCK);
  const observable = new Observable<ObserverMap>();
  const observer = new Observer("on-test", callback);

  observable.Subscribe(observer);
  observable.Unsubscribe(observer);
  observable.Notify("on-test", "test");

  expect(callback).not.toHaveBeenCalled();
  callback.mockClear();
})

