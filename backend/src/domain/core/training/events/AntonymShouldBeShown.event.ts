import { TrainingId } from '../Training.entity';
import { StudentForTraining } from '../entities/StudentForTraining.entity';
import { TeacherForTraining } from '../entities/TeacherForTraining.entity';
import { Event } from '../../../other/base/Event';
import { Antonym } from '../../../other/word/Antonym.entity';
import { Maybe } from '../../../other/base/Maybe';

export class AntonymShouldBeShownEvent extends Event {
  constructor(
    public readonly trainingId: TrainingId,
    public readonly student: StudentForTraining,
    public readonly teacher: Maybe<TeacherForTraining>,
    public readonly antonym?: Antonym,
  ) {
    super('AntonymShouldBeShownEvent');
  }
}
