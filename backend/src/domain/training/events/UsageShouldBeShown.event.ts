import { BaseEvent } from '../../base/BaseEvent';
import { TrainingId } from '../Training.e';
import { Student } from '../Student.e';
import { Teacher } from '../Teacher.e';
import { Transcription, Translation, Usage, Value } from '../Word.e';

export class UsageShouldBeShownEvent extends BaseEvent {
  private readonly trainingId: TrainingId;
  private readonly student: Student;
  private readonly teacher: Teacher;
  private readonly usage: Usage;

  constructor(trainingId: TrainingId, student: Student, teacher: Teacher | undefined, usage: Usage) {
    super();
    this.trainingId = trainingId;
    this.student = student;
    this.teacher = teacher;
    this.usage = usage;
  }
}
