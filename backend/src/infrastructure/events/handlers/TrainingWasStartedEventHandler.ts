import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { TrainingWasStartedEvent } from '../../../domain/core/training/events/TrainingWasStarted.event';
import { SocketConnectionsService } from '../../../infrastructure-interfaces/network/SocketConnectionsService';
import { TrainingData } from '../../../infrastructure-interfaces/network/data/TrainingData';

export class TrainingWasStartedEventHandler implements EventHandler<TrainingWasStartedEvent> {
  constructor(private readonly socketConnectionsService: SocketConnectionsService) {}

  async handle(event: TrainingWasStartedEvent): Promise<void> {
    const data = new TrainingData({
      trainingId: event.trainingId.value,
    });

    await this.socketConnectionsService.sendData(event.student.id.value, data);

    if (!!event.teacher) {
      await this.socketConnectionsService.sendData(event.teacher.id.value, data);
    }
  }
}
