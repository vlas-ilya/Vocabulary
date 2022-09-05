import { Event } from '../../../other/base/Event';
import { TrainingId } from '../Training.entity';
import { TrainingState } from '../entities/TrainingState.value';

export class TrainingStateWasUpdatedEvent extends Event {
  constructor(public readonly trainingId: TrainingId, public readonly state: TrainingState) {
    super('TrainingStateWasUpdatedEvent');
  }
}
