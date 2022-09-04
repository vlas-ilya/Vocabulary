import { BaseEvent } from '../../base/BaseEvent';
import { TrainingId, TrainingState } from '../Training.e';

export class TrainingStateWasUpdatedEvent extends BaseEvent {
  private readonly trainingId: TrainingId;
  private readonly state: TrainingState;

  constructor(trainingId: TrainingId, state: TrainingState) {
    super();
    this.trainingId = trainingId;
    this.state = state;
  }
}
