import { Entity } from '../base/Entity';
import { Id } from '../base/Id';
import { ValueObject } from '../base/ValueObject';

export class Usage extends Entity<UsageId> {
  public readonly value: UsageValue;

  constructor(id: UsageId, value: UsageValue) {
    super(id);
    this.value = value;
  }
}

export class UsageValue extends ValueObject {
  readonly value: String;

  constructor(value: String) {
    super();
    this.value = value;
  }
}

export class UsageId extends Id {}
