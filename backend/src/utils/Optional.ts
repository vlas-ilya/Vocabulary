import { Error } from './Error';
import { Maybe } from '../domain/other/base/Maybe';

export class Optional<T> {
  private readonly result?: T;

  constructor(result?: T) {
    this.result = result;
  }

  orThrow(error: Error): T {
    if (this.result) {
      return this.result;
    }
    throw error;
  }

  orElse(value: Maybe<T>): Maybe<T> {
    if (this.result) {
      return this.result;
    }
    return value;
  }

  map<R>(fun: (item: T) => R): Optional<R> {
    if (this.result) {
      return new Optional<R>(fun(this.result));
    }
    return new Optional<R>(undefined);
  }

  ifEmpty(): boolean {
    return !this;
  }
}
