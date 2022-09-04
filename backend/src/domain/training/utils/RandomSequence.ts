import { BaseValueObject } from '../../base/BaseValueObject';

export class RandomSequence extends BaseValueObject {
  public readonly numbers: number[];
  public current: number;

  constructor(numbers: number[], current?: number) {
    super();
    this.numbers = numbers;
    this.current = current ?? 0;
  }

  next(): number {
    if (this.current + 1 >= this.numbers.length) {
      return this.numbers[this.current];
    }
    return this.numbers[this.current++];
  }
}
