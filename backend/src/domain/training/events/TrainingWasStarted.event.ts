import { BaseEvent } from '../../base/BaseEvent';
import { TrainingId } from '../Training.e';
import { Student } from '../Student.e';
import { Teacher } from '../Teacher.e';

export class TrainingWasStartedEvent extends BaseEvent {
  private readonly trainingId: TrainingId;
  private readonly student: Student;
  private readonly teacher: Teacher | undefined;

  constructor(trainingId: TrainingId, student: Student, teacher: Teacher | undefined) {
    super();
    this.trainingId = trainingId;
    this.student = student;
    this.teacher = teacher;
  }
}
