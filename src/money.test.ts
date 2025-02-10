import { describe, expect, it } from 'vitest';
import { Money } from './money';

type Equals<T> = {
  equals(some: T): boolean
}

function assertEquals<T>(foo: Equals<T>, bar: T) {
  expect(foo.equals(bar)).toBe(true)
}

describe('Money', () => {
  it('掛け算ができる', () => {
    let five: Money = Money.dollar(5);
    assertEquals(Money.dollar(10), five.times(2));
    assertEquals(Money.dollar(15), five.times(3));

    five = Money.franc(5);
    assertEquals(Money.franc(10), five.times(2));
    assertEquals(Money.franc(15), five.times(3));
  })

  it('equalができる', () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true);
    expect(Money.dollar(5).equals(Money.dollar(6))).toBe(false);
    expect(Money.franc(5).equals(Money.dollar(5))).toBe(false);
  })

  it('currencyが取得できる', () => {
    expect(Money.dollar(1).currency).toBe('USD');
    expect(Money.franc(1).currency).toBe('CHF');
  })
})
