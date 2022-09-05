import { StudentForTraining } from '../entities/StudentForTraining.entity';
import { TeacherForTraining } from '../entities/TeacherForTraining.entity';
import { TrainingId } from '../Training.entity';
import { Transcription, Translation, Value } from '../../../other/word/Word.entity';
import { Event } from '../../../other/base/Event';
import { Maybe } from '../../../other/base/Maybe';

export class AnswerShouldBeShownEvent extends Event {
  constructor(
    public readonly trainingId: TrainingId,
    public readonly student: StudentForTraining,
    public readonly teacher: Maybe<TeacherForTraining>,
    public readonly answer: [Value, Transcription] | Translation,
  ) {
    super('AnswerShouldBeShownEvent');
  }
}
