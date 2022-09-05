import { Event } from '../../../other/base/Event';
import { StudentId } from '../Student.entity';
import { Profile } from '../../../other/profile/Profile.value';

export class StudentProfileWasChangedEvent extends Event {
  constructor(public readonly studentId: StudentId, public readonly profile: Profile) {
    super('StudentProfileWasChangedEvent');
  }
}
