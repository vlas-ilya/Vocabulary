import { BaseValueObject } from './BaseValueObject';
import { BaseId } from './Id.vo';

export class BaseValueObjectWithId<T extends BaseId> extends BaseValueObject {
  public id: T;

  constructor(id: T) {
    super();
    this.id = id;
  }

  equalById(object: BaseValueObjectWithId<T>): boolean {
    return this.id.equal(object.id);
  }

  equals(object: BaseValueObjectWithId<T>): boolean {
    return this.equalById(object);
  }
}
