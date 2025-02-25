type Brand = "USD" | "CHF";

interface MoneyMapping {
  USD: Money;
  CHF: Money;
}

interface Hash {
  hashCode(): number;
}
class HashMap<K extends Hash, V> {
  // TODO(@sskw-ugo): 間に合わせの実装！
  private map: Map<number, V> = new Map();
  public put(key: K, value: V) {
    this.map.set(key.hashCode(), value);
  }
  public get(key: K): V | undefined {
    return this.map.get(key.hashCode());
  }
  public remove(key: K) {
    this.map.delete(key.hashCode());
  }
}

interface Expression {
  plus(addend: Expression): Expression;
  times(multiplier: number): Expression;
  reduce(bank: Bank, to: Brand): Money;
}

class Pair implements Hash {
  from: Brand;
  to: Brand;
  constructor(from: Brand, to: Brand) {
    this.from = from;
    this.to = to;
  }
  equals(pair: Pair): boolean {
    return this.from === pair.from && this.to === pair.to;
  }
  hashCode(): number {
    return 0;
  }
}

export class Sum implements Expression {
  augend: Expression;
  addend: Expression;
  constructor(augend: Expression, addend: Expression) {
    this.augend = augend;
    this.addend = addend;
  }

  public plus(addend: Expression): Expression {
    return new Sum(this, addend);
  }

  public times(multiplier: number): Expression {
    return new Sum(this.augend.times(multiplier), this.augend.times(multiplier));
  }

  public reduce(bank: Bank, to: Brand): Money {
    const amount = this.augend.reduce(bank, to).amount
      + this.addend.reduce(bank, to).amount;
    return Money.create(to, amount);
  }

}

export class Bank {
  private rates: HashMap<Pair, number> = new HashMap();
  public reduce(source: Expression, to: Brand): Money {
    return source.reduce(this, to);
  }
  public addRate(from: Brand, to: Brand, rate: number) {
    this.rates.put(new Pair(from, to), rate);
  }
  rate(from: Brand, to: Brand): number {
    if (from === to) {
      return 1;
    }
    return this.rates.get(new Pair(from, to)) as number;
  }
}

export class Money implements Expression {
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
  public plus(addend: Expression): Expression {
    return new Sum(this, addend);
  }
  public reduce(bank: Bank, to: Brand): Money {
    const rate = bank.rate(this.currency, to)
    return new Money(this.amount / rate, to);
  }
  public equals(money: Money): boolean {
    return this.currency === money.currency && this.amount === money.amount;
  }
  public times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this._currency);
  }
}

export class Franc extends Money {}
