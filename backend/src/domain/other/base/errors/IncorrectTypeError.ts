import { DomainError } from './DomainError';

export class IncorrectTypeError extends DomainError {
  readonly type: String;
  readonly value: String;

  constructor(type: String, value: String) {
    super();
    this.type = type;
    this.value = value;
  }
}
