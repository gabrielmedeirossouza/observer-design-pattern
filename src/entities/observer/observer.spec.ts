import { Observer } from './observer'

it("should create an observer with an event and a callback", () => {
  const mockCallback = () => {}
  const observer = new Observer('on-test', mockCallback)

  expect(observer.event).toBe('on-test')
  expect(observer.callback).toBe(mockCallback)
})

