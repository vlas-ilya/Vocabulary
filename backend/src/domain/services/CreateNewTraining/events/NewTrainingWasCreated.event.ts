import { Event } from '../../../other/base/Event';
import { TrainingId } from '../../../core/training/Training.entity';
import { TrainingParameters } from '../../../core/training/entities/TrainingParameters.value';
import { TrainingState } from '../../../core/training/entities/TrainingState.value';

export class NewTrainingWasCreatedEvent extends Event {
  constructor(public trainingId: TrainingId, public parameters: TrainingParameters, public state: TrainingState) {
    super('NewTrainingWasCreated');
  }
}
