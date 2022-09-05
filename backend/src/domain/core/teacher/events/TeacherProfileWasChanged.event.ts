import { Event } from '../../../other/base/Event';
import { TeacherId } from '../Teacher.entity';
import { Profile } from '../../../other/profile/Profile.value';

export class TeacherProfileWasChangedEvent extends Event {
  constructor(public readonly teacherId: TeacherId, public readonly profile: Profile) {
    super('TeacherProfileWasChangedEvent');
  }
}
