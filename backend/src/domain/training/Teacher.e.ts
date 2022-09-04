import { BaseId } from '../base/BaseId.vo';
import { BaseEntity } from '../base/BaseEntity';
import { Student } from './Student.e';
import { Word } from './Word.e';

export class Teacher extends BaseEntity<TeacherId> {

}

export class TeacherId extends BaseId {}
