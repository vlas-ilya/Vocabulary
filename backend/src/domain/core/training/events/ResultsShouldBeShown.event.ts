import { Event, EventCode } from '../../../other/base/Event';
import { TrainingId } from '../Training.entity';
import { StudentForTraining } from '../entities/StudentForTraining.entity';
import { TeacherForTraining } from '../entities/TeacherForTraining.entity';
import { Word } from '../../../other/word/Word.entity';
import { Maybe } from '../../../other/base/Maybe';

export class ResultsShouldBeShownEvent extends Event {
  constructor(
    public readonly trainingId: TrainingId,
    public readonly student: StudentForTraining,
    public readonly teacher: Maybe<TeacherForTraining>,
    public readonly correctAnswers: Word[],
    public readonly incorrectAnswers: Word[],
  ) {
    super('ResultsShouldBeShownEvent');
  }
}
