import { ValueObject } from '../base/ValueObject';
import { Age } from './Age.value';
import { Gender } from './Gender.value';
import { Name } from './Name.value';

export class Profile extends ValueObject {
  constructor(public readonly name: Name, public readonly gender: Gender, public readonly age: Age) {
    super();
  }
}
