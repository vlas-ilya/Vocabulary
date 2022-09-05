import { ValueObject } from '../base/ValueObject';

export class Gender extends ValueObject {
  constructor(public readonly value: 'M' | 'G' | 'None') {
    super();
  }
}
