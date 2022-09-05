import { Maybe } from '../domain/other/base/Maybe';

export class Result<T, E extends Error> {
  private value: Maybe<T>;
  private error: Maybe<E>;

  static ofResult<T, E extends Error>(value: T): Result<T, E> {
    const result = new Result<T, E>();
    result.value = value;
    return result;
  }

  static ofError<T, E extends Error>(error: E): Result<T, E> {
    const result = new Result<T, E>();
    result.error = error;
    return result;
  }
}
