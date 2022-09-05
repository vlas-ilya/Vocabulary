import { Event } from '../../../other/base/Event';
import { TeacherId } from '../Teacher.entity';
import { StudentForTeacher } from '../entities/StudentForTeacher.entity';

export class StudentListWasChangedEvent extends Event {
  constructor(public readonly teacherId: TeacherId, public readonly students: StudentForTeacher[]) {
    super('StudentListWasChangedEvent');
  }
}
