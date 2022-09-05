import { TrainingId } from '../Training.entity';
import { StudentForTraining } from '../entities/StudentForTraining.entity';
import { TeacherForTraining } from '../entities/TeacherForTraining.entity';
import { Event } from '../../../other/base/Event';
import { Usage } from '../../../other/word/Usage.entity';
import { Maybe } from '../../../other/base/Maybe';

export class UsageShouldBeShownEvent extends Event {
  constructor(
    public readonly trainingId: TrainingId,
    public readonly student: StudentForTraining,
    public readonly teacher: Maybe<TeacherForTraining>,
    public readonly usage?: Usage,
  ) {
    super('UsageShouldBeShownEvent');
  }
}
