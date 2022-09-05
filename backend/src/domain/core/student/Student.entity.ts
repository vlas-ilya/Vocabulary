import { WordSet } from '../../other/word/WordSet.entity';
import { Id } from '../../other/base/Id';
import { Profile } from '../../other/profile/Profile.value';
import { StudentProfileWasChangedEvent } from './events/StudentProfileWasChanged.event';
import { WordSetUser } from '../../other/word/WordSetUser.entity';
import { RandomIdGenerator } from '../../../utils/RandomIdGenerator';

export class Student extends WordSetUser<StudentId> {
  constructor(id: StudentId, private profile: Profile, wordSets: WordSet[], randomIdGenerator: RandomIdGenerator) {
    super(id, wordSets, randomIdGenerator);
  }

  fillProfile(profile: Profile) {
    this.profile = profile;
    this.addEvent(new StudentProfileWasChangedEvent(this.id, this.profile));
  }
}

export class StudentId extends Id {}
