import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { ResultsShouldBeShownEvent } from '../../../domain/core/training/events/ResultsShouldBeShown.event';
import { SocketConnectionsService } from '../../../infrastructure-interfaces/network/SocketConnectionsService';
import { TrainingResultsData } from '../../../infrastructure-interfaces/network/data/TrainingResultsData';

export class ResultsShouldBeShownEventHandler implements EventHandler<ResultsShouldBeShownEvent> {
  constructor(private readonly socketConnectionsService: SocketConnectionsService) {}

  async handle(event: ResultsShouldBeShownEvent): Promise<void> {
    const data = new TrainingResultsData({
      trainingId: event.trainingId.value,
      correctAnswers: event.correctAnswers.map((word) => ({ value: word.value.value })),
      incorrectAnswers: event.incorrectAnswers.map((word) => ({ value: word.value.value })),
    });

    await this.socketConnectionsService.sendData(event.student.id.value, data);

    if (!!event.teacher) {
      await this.socketConnectionsService.sendData(event.teacher.id.value, data);
    }
  }
}
