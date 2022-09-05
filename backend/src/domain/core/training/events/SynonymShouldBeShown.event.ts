import { TrainingId } from '../Training.entity';
import { StudentForTraining } from '../entities/StudentForTraining.entity';
import { TeacherForTraining } from '../entities/TeacherForTraining.entity';
import { Event } from '../../../other/base/Event';
import { Synonym } from '../../../other/word/Synonym.entity';
import { Maybe } from '../../../other/base/Maybe';

export class SynonymShouldBeShownEvent extends Event {
  constructor(
    public readonly trainingId: TrainingId,
    public readonly student: StudentForTraining,
    public readonly teacher: Maybe<TeacherForTraining>,
    public readonly synonym?: Synonym,
  ) {
    super('SynonymShouldBeShownEvent');
  }
}
