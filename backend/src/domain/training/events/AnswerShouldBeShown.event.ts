import { BaseEvent } from '../../base/BaseEvent';
import { Student } from '../Student.e';
import { Transcription, Translation, Value } from '../Word.e';
import { Teacher } from '../Teacher.e';
import { TrainingId } from '../Training.e';

export class AnswerShouldBeShownEvent extends BaseEvent {
  private readonly trainingId: TrainingId;
  private readonly student: Student;
  private readonly teacher: Teacher;
  private readonly question: [Value, Transcription] | Translation;

  constructor(
    trainingId: TrainingId,
    student: Student,
    teacher: Teacher | undefined,
    question: [Value, Transcription] | Translation,
  ) {
    super();
    this.trainingId = trainingId;
    this.student = student;
    this.teacher = teacher;
    this.question = question;
  }
}
