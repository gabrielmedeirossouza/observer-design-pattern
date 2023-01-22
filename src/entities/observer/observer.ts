export type Event = `on-${string}`;
export type Callback = (...args: any[]) => void;

/**
 * @description Observer entity.
 * @param event Must be a string that starts with "on-"
 * @param callback The callback that will be called when the event is triggered
 */
export class Observer<E extends Event, C extends Callback> {
    constructor(
      public readonly event: E,
      public readonly callback: C
    ) {}
  }
