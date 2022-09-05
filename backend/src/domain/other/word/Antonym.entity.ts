import { Entity } from '../base/Entity';
import { Id } from '../base/Id';
import { ValueObject } from '../base/ValueObject';

export class Antonym extends Entity<any> {
  readonly value: AntonymValue;

  constructor(id: any, value: AntonymValue) {
    super(id);
    this.value = value;
  }
}

export class AntonymValue extends ValueObject {
  readonly value: String;

  constructor(value: String) {
    super();
    this.value = value;
  }
}

export class AntonymId extends Id {}
