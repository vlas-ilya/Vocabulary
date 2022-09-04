import { BaseEvent } from '../../base/BaseEvent';
import { WordSet } from '../WordSet.e';
import { StudentId, StudentProfile } from '../Student.e';

export type Modification = { profile?: StudentProfile; wordSets?: WordSet[] };

export class WasDataModificationEvent extends BaseEvent {
  public id: StudentId;
  public modification: Modification;

  constructor(id: StudentId, modification: Modification) {
    super();
    this.id = id;
    this.modification = modification;
  }
}
