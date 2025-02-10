type Brand = "USD" | "CHF";

interface MoneyMapping {
  USD: Money;
  CHF: Money;
}

export class Money {
  // ジェネリクスを使い、brandに応じた型を返すように定義
  static create<B extends Brand>(brand: B, amount: number): MoneyMapping[B] {
    switch (brand) {
      case "USD":
        // 型アサーションを用いて MoneyMapping[B] に合わせる
        return new Money(amount, "USD") as MoneyMapping[B];
      case "CHF":
        return new Money(amount, "CHF") as MoneyMapping[B];
      default:
        // never を利用して網羅性チェック
        // biome-ignore lint/correctness/noSwitchDeclarations: <explanation>
        const _exhaustiveCheck: never = brand;
        throw new Error("Invalid brand");
    }
  }

  protected amount: number;
  protected _currency: Brand;
  constructor(amount: number, currency: Brand) {
    this.amount = amount;
    this._currency = currency;
  }

  static dollar(amount: number): Money {
    return Money.create("USD", amount);
  }
  static franc(amount: number): Money {
    return Money.create("CHF", amount);
  }

  get currency(): Brand {
    return this._currency;
  }
  public equals(money: Money): boolean {
    return this.currency === money.currency && this.amount === money.amount;
  }
  public times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this._currency);
  }
}


export class Franc extends Money {}
