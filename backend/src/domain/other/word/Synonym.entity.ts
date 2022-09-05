import { Entity } from '../base/Entity';
import { Id } from '../base/Id';
import { ValueObject } from '../base/ValueObject';

export class Synonym extends Entity<SynonymId> {
  readonly value: SynonymValue;

  constructor(id: SynonymId, value: SynonymValue) {
    super(id);
    this.value = value;
  }
}

export class SynonymValue extends ValueObject {
  readonly value: String;

  constructor(value: String) {
    super();
    this.value = value;
  }
}

export class SynonymId extends Id {}
