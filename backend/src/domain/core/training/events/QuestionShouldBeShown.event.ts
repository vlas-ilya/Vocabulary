import { Event } from '../../../other/base/Event';
import { StudentForTraining } from '../entities/StudentForTraining.entity';
import { TeacherForTraining } from '../entities/TeacherForTraining.entity';
import { TrainingId } from '../Training.entity';
import { Transcription, Translation, Value } from '../../../other/word/Word.entity';
import { Usage } from '../../../other/word/Usage.entity';
import { Maybe } from '../../../other/base/Maybe';

export class QuestionShouldBeShownEvent extends Event {
  constructor(
    public readonly trainingId: TrainingId,
    public readonly student: StudentForTraining,
    public readonly teacher: Maybe<TeacherForTraining>,
    public readonly question: [Value, Transcription] | Translation | Usage,
  ) {
    super('QuestionShouldBeShownEvent');
  }
}
