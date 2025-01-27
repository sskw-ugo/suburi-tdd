import { it , expect, describe } from 'vitest';
import { Dollar } from './money';

describe('Dollar', () => {
  it('掛け算ができる', () => {
    const five = new Dollar(5);
    let product = five.times(2);
    expect(product.amount).toBe(10);

    product = five.times(3)
    expect(product.amount).toBe(15);

  })
})