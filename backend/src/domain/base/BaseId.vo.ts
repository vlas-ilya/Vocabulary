import { BaseValueObject } from './BaseValueObject';

export class BaseId extends BaseValueObject {
  public readonly value: String;

  constructor(value: String) {
    super();
    this.value = value;
  }

  equals(object: BaseId): boolean {
    return object && this && this.value == object.value;
  }
}
