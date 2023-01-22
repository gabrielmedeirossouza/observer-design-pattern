import { Observable } from '../entities/observable';
import {ObserverFactory} from '../factories/observer-factory'

type ObserverMap = {
  "on-start": () => void;
  "on-stop": () => void;
  "on-accelerate": (speed: number) => void;
  "on-decelerate": (speed: number) => void;
}

function car() {
  const observable = new Observable<ObserverMap>();

  const state = {
    isRunning: false,
    speed: 0,
  }

  function start() {
    state.isRunning = true;
    observable.Notify("on-start");
  }

  function stop() {
    if (state.speed > 0) return;

    state.isRunning = false;
    observable.Notify("on-stop");
  }

  function accelerate() {
    if (!state.isRunning) return;

    if (state.speed >= 100) {
      state.speed = 100;
      observable.Notify("on-accelerate", state.speed);

      return;
    }

    state.speed += 10;
    observable.Notify("on-accelerate", state.speed);
  }

  function decelerate() {
    if (!state.isRunning) return;

    if (state.speed <= 0) {
      state.speed = 0;
      observable.Notify("on-decelerate", state.speed);
      return;
    }

    state.speed -= 10;
    observable.Notify("on-decelerate", state.speed);
  }

  return {
    observable,
    state,
    start,
    stop,
    accelerate,
    decelerate,
  }
}

const car1 = car();

const { CreateObserver } = new ObserverFactory<ObserverMap>();

car1.observable.Subscribe(CreateObserver("on-start", () => {
  console.log("Car started");
}));

car1.observable.Subscribe(CreateObserver("on-stop", () => {
  console.log("Car stopped");
}));

car1.observable.Subscribe(CreateObserver("on-accelerate", (speed) => {
  console.log(`Car accelerated to ${speed} km/h`);
}));

car1.observable.Subscribe(CreateObserver("on-decelerate", (speed) => {
  console.log(`Car decelerated to ${speed} km/h`);
}));

car1.start();
car1.accelerate();
car1.accelerate();
car1.accelerate();
car1.accelerate();
car1.decelerate();
car1.accelerate();
car1.decelerate();
car1.decelerate();
car1.decelerate();
car1.decelerate();
car1.stop();
