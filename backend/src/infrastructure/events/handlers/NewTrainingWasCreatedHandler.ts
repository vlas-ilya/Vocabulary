import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { NewTrainingWasCreatedEvent } from '../../../domain/services/CreateNewTraining/events/NewTrainingWasCreated.event';
import { TrainingDao } from '../../../infrastructure-interfaces/dao/TrainingDao';
import { TrainingDto } from '../../../infrastructure-interfaces/dao/dto/TrainingDto';
import { TrainingStateDto } from '../../../infrastructure-interfaces/dao/dto/TrainingStateDto';

export class NewTrainingWasCreatedHandler implements EventHandler<NewTrainingWasCreatedEvent> {
  constructor(private readonly trainingDao: TrainingDao) {}

  async handle(event: NewTrainingWasCreatedEvent): Promise<void> {
    await this.trainingDao.save(
      new TrainingDto(
        event.trainingId.value,
        event.parameters.student.id.value,
        event.parameters.teacher?.id?.value,
        event.parameters.wordSet.id.value,
        event.parameters.owner,
        event.parameters.trainingType,
        TrainingStateDto.convertFromEntity(event.state),
      ),
    );
  }
}
