export abstract class Money {
  static dollar(amount: number): Dollar {
    return new Dollar(amount);
  }
  static franc(amount: number): Franc {
    return new Franc(amount);
  }
  protected amount: number;
  constructor(amount: number) {
    this.amount = amount;
  }
  public equals(money: Money): boolean {
    return (
      this.constructor === money.constructor && this.amount === money.amount
    );
  }
  abstract times(multiplier: number): Money;
}

export class Dollar extends Money {
  times(multiplier: number): Money {
    return new Dollar(this.amount * multiplier);
  }
}

export class Franc extends Money {
  times(multiplier: number): Money {
    return new Franc(this.amount * multiplier);
  }
}
