import { ValueObject } from '../base/ValueObject';

export class Name extends ValueObject {
  constructor(public readonly value: String) {
    super();
  }
}
