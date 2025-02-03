class Money {
  protected amount: number;
  constructor(amount: number) {
    this.amount = amount;
  }
  public equals(money: Money): boolean {
    return this.amount === money.amount;
  }
}

export class Dollar extends Money {
  times(multiplier: number): Dollar {
    return new Dollar(this.amount * multiplier);
  }
}

export class Franc extends Money {
  times(multiplier: number): Franc {
    return new Franc(this.amount * multiplier);
  }
}
