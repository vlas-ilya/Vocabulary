import { BaseEvent } from '../../base/BaseEvent';
import { Student } from '../Student.e';
import { Translation, Usage, Value } from '../Word.e';
import { Teacher } from '../Teacher.e';
import { TrainingId } from '../Training.e';

export class QuestionShouldBeShownEvent extends BaseEvent {
  private readonly trainingId: TrainingId;
  private readonly student: Student;
  private readonly teacher: Teacher | undefined;
  private readonly question: [Value, Translation] | Translation | Usage;

  constructor(
    trainingId: TrainingId,
    student: Student,
    teacher: Teacher | undefined,
    question: [Value, Translation] | Translation | Usage,
  ) {
    super();
    this.trainingId = trainingId;
    this.student = student;
    this.teacher = teacher;
    this.question = question;
  }
}
