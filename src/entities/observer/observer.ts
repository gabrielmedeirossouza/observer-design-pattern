export class Observer<E extends string, C extends Function> {
    constructor(
      public event: E,
      public callback: C
    ) {}
  }
  