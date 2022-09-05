import { DomainService } from '../../other/base/DomainService';
import { Training, TrainingId } from '../../core/training/Training.entity';
import { WordSet } from '../../other/word/WordSet.entity';
import { RandomIdGenerator } from '../../../utils/RandomIdGenerator';
import { RandomSequenceGenerator } from '../../core/training/utils/RandomSequenceGenerator';
import { TrainingState } from '../../core/training/entities/TrainingState.value';
import { TrainingParameters, TrainingType } from '../../core/training/entities/TrainingParameters.value';
import { NewTrainingWasCreatedEvent } from './events/NewTrainingWasCreated.event';
import { StudentForTraining } from '../../core/training/entities/StudentForTraining.entity';
import { TeacherForTraining } from '../../core/training/entities/TeacherForTraining.entity';
import { Maybe } from '../../other/base/Maybe';

export class CreateNewTrainingService extends DomainService {
  constructor(
    private readonly student: StudentForTraining,
    private readonly teacher: Maybe<TeacherForTraining>,
    private readonly wordSet: WordSet,
    private readonly randomIdGenerator: RandomIdGenerator,
    private readonly randomSequenceGenerator: RandomSequenceGenerator,
    private readonly trainingType: TrainingType,
  ) {
    super();
  }

  createTraining(): TrainingId {
    const id = new TrainingId(this.randomIdGenerator.random());
    const state = new TrainingState().initiate(this.randomSequenceGenerator, this.wordSet.words);
    const wordSet = this.wordSet.clone(this.randomIdGenerator);
    const parameters = new TrainingParameters(
      this.student,
      this.teacher,
      wordSet,
      this.randomSequenceGenerator,
      this.teacher ? 'Teacher' : 'Student',
      this.trainingType,
    );

    new Training(id, parameters, state);

    this.addEvent(new NewTrainingWasCreatedEvent(id, parameters, state));

    return id;
  }
}
