import { it , expect, describe, test } from 'vitest';
import { Dollar, Franc } from './money';

type Equals<T> = {
  equals(some: T): boolean
}

function assertEquals<T>(foo: Equals<T>, bar: T) {
  expect(foo.equals(bar)).toBe(true)
}

describe('Dollar', () => {
  it('掛け算ができる', () => {
    const five = new Dollar(5);
    assertEquals(new Dollar(10), five.times(2));
    assertEquals(new Dollar(15), five.times(3));

  })

  it('equalができる', () => {
    expect(new Dollar(5).equals(new Dollar(5))).toBe(true);
    expect(new Dollar(5).equals(new Dollar(6))).toBe(false);
  })
})

describe('Franc', () => {
  it('掛け算ができる', () => {
    const five = new Franc(5);
    assertEquals(new Franc(10), five.times(2));
    assertEquals(new Franc(15), five.times(3));
  })
})