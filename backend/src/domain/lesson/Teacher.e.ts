import { BaseId } from '../base/BaseId.vo';
import { BaseEntity } from '../base/BaseEntity';

export class Teacher extends BaseEntity<TeacherId> {}

export class TeacherId extends BaseId {}
