import { it , expect, describe, test } from 'vitest';
import { Money, Dollar, Franc } from './money';

type Equals<T> = {
  equals(some: T): boolean
}

function assertEquals<T>(foo: Equals<T>, bar: T) {
  expect(foo.equals(bar)).toBe(true)
}

describe('Dollar', () => {
  it('掛け算ができる', () => {
    const five: Money = Money.dollar(5);
    assertEquals(Money.dollar(10), five.times(2));
    assertEquals(Money.dollar(15), five.times(3));

  })

  it('equalができる', () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true);
    expect(Money.dollar(5).equals(Money.dollar(6))).toBe(false);
  })
})

describe('Franc', () => {
  it('掛け算ができる', () => {
    const five = Money.franc(5);
    assertEquals(Money.franc(10), five.times(2));
    assertEquals(Money.franc(15), five.times(3));
  })

  it('equalができる', () => {
    expect(Money.franc(5).equals(Money.franc(5))).toBe(true);
    expect(Money.franc(5).equals(Money.franc(6))).toBe(false);
  })
})

describe('Money', () => {
  it('equalができる', () => {
    expect(Money.franc(5).equals(Money.dollar(5))).toBe(false);
  })
})