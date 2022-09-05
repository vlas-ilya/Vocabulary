import { Id } from '../../other/base/Id';
import { StudentForTeacher } from './entities/StudentForTeacher.entity';
import { WordSet } from '../../other/word/WordSet.entity';
import { StudentListWasChangedEvent } from './events/StudentListWasChanged.event';
import { TeacherProfileWasChangedEvent } from './events/TeacherProfileWasChanged.event';
import { WordSetUser } from '../../other/word/WordSetUser.entity';
import { StudentId } from '../student/Student.entity';
import { RandomIdGenerator } from '../../../utils/RandomIdGenerator';
import { Profile } from '../../other/profile/Profile.value';

export class Teacher extends WordSetUser<TeacherId> {
  constructor(
    id: TeacherId,
    private profile: Profile,
    private students: StudentForTeacher[],
    wordSets: WordSet[],
    randomIdGenerator: RandomIdGenerator,
  ) {
    super(id, wordSets, randomIdGenerator);
  }

  fillProfile(profile: Profile) {
    this.profile = profile;
    this.addEvent(new TeacherProfileWasChangedEvent(this.id, this.profile));
  }

  addStudent(student: StudentForTeacher) {
    this.students = [...this.students, student];
    this.addEvent(new StudentListWasChangedEvent(this.id, this.students));
  }

  removeStudent(studentId: StudentId) {
    this.students = this.students.filter((student) => !student.equals(studentId));
    this.addEvent(new StudentListWasChangedEvent(this.id, this.students));
  }
}

export class TeacherId extends Id {}
