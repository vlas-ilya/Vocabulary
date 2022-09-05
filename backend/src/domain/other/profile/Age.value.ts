import { ValueObject } from '../base/ValueObject';

export class Age extends ValueObject {
  constructor(public readonly value: number) {
    super();
  }
}
