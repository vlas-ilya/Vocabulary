import { ValueObject } from './ValueObject';

export abstract class Id extends ValueObject {
  public readonly value: String;

  constructor(value: String) {
    super();
    this.value = value;
  }

  equals(object: Id): boolean {
    return object && this && this.value == object.value;
  }
}
