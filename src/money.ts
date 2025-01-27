export class Dollar {
  #amount: number;
  constructor(amount: number) {
    this.#amount = amount;
  }
  times(multiplier: number): Dollar {
    return new Dollar(this.#amount * multiplier)
  }
  equals(dollar: Dollar): boolean {
    return this.#amount === dollar.#amount;
  }
}

export class Franc {
  #amount: number;
  constructor(amount: number) {
    this.#amount = amount;
  }
  times(multiplier: number): Franc {
    return new Franc(this.#amount * multiplier)
  }
  equals(dollar: Franc): boolean {
    return this.#amount === dollar.#amount;
  }
}
