import { ValueObject } from '../../../other/base/ValueObject';
import { Id } from '../../../other/base/Id';
import { Optional } from '../../../../utils/Optional';

export class RandomSequence<ID extends Id> extends ValueObject {
  public list: ID[];

  constructor(list: ID[]) {
    super();
    this.list = [...list];
  }

  next(id?: ID): Optional<ID> {
    if (this.list.length == 0) {
      return new Optional<ID>();
    }
    if (id) {
      this.list = this.list.filter((item) => !item.equals(id));
      return new Optional<ID>(id);
    }
    return new Optional<ID>(this.list.shift());
  }
}
