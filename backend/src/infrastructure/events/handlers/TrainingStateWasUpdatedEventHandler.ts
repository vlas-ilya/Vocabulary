import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { TrainingStateWasUpdatedEvent } from '../../../domain/core/training/events/TrainingStateWasUpdated.event';
import { TrainingDao } from '../../../infrastructure-interfaces/dao/TrainingDao';
import { EntityNotFoundById } from '../../../repository-interfaces/errors/EntityNotFoundById';
import { TrainingStateDto } from '../../../infrastructure-interfaces/dao/dto/TrainingStateDto';

export class TrainingStateWasUpdatedEventHandler implements EventHandler<TrainingStateWasUpdatedEvent> {
  constructor(public readonly trainingDao: TrainingDao) {}

  async handle(event: TrainingStateWasUpdatedEvent): Promise<void> {
    const trainingDto = (await this.trainingDao.findById(event.trainingId.value)).orThrow(
      new EntityNotFoundById('Training', event.trainingId),
    );
    trainingDto.state = TrainingStateDto.convertFromEntity(event.state);
    await this.trainingDao.save(trainingDto);
  }
}
