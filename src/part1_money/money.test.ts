import { assert, describe, expect, it } from 'vitest';
import { Bank, Money, Sum } from '../money';

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

  it('足し算ができる', () => {
    const bank = new Bank();
    const five = Money.dollar(5);
    const sum = five.plus(five);
    const reduced = bank.reduce(sum, 'USD');
    assertEquals(Money.dollar(10), reduced);
  })

  it('足し算の結果はSum', () => {
    const five: Money = Money.dollar(5);
    const result = five.plus(five);
    const sum: Sum = result as Sum;
    assertEquals(five, sum.augend);
    assertEquals(five, sum.addend);
  })

  it('sumをreduceできる', () => {
    const sum: Sum = new Sum(Money.dollar(3), Money.dollar(4));
    const bank = new Bank();
    const result = bank.reduce(sum, 'USD');
    assertEquals(Money.dollar(7), result);
  })

  it('modeyをreduceできる', () => {
    const bank = new Bank();
    const result = bank.reduce(Money.dollar(1), 'USD');
    assertEquals(Money.dollar(1), result);
  })

  it('異なる通貨をreduceできる', () => {
    const bank = new Bank();
    bank.addRate('CHF', 'USD', 2);
    const result = bank.reduce(Money.franc(2), 'USD');
    assertEquals(Money.dollar(1), result);
  })

  it('equalができる', () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true);
    expect(Money.dollar(5).equals(Money.dollar(6))).toBe(false);
    expect(Money.franc(5).equals(Money.dollar(5))).toBe(false);
  })

  it('同じ通貨の場合、rateは1', () => {
    expect(new Bank().rate('USD', 'USD')).toBe(1);
  });

  it('currencyが取得できる', () => {
    expect(Money.dollar(1).currency).toBe('USD');
    expect(Money.franc(1).currency).toBe('CHF');
  })

  it('異なる通貨を足し算できる', () => {
    const bank = new Bank();
    bank.addRate('CHF', 'USD', 2);
    const fiveBucks: Expression = Money.dollar(5);
    const tenFrancs: Expression = Money.franc(10);
    const result = bank.reduce(fiveBucks.plus(tenFrancs), 'USD');
    assertEquals(Money.dollar(10), result);
  })

  it('Sumと通貨を足し算できる', () => {
    const fiveBucks = Money.dollar(5);
    const tenFrancs = Money.franc(10);
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    const sum = new Sum(fiveBucks, tenFrancs).plus(fiveBucks);
    const result = bank.reduce(sum, "USD");
    assertEquals(Money.dollar(15), result)
  })

  it('Sumを掛け算できる', () => {
    const fiveBucks = Money.dollar(5);
    const tenFrancs = Money.franc(10);
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    const sum = new Sum(fiveBucks, tenFrancs).times(2);
    const result = bank.reduce(sum, "USD");
    assertEquals(Money.dollar(20), result);
  })

})
