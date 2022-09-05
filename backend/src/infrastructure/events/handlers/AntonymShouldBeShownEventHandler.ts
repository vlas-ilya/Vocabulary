import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { AntonymShouldBeShownEvent } from '../../../domain/core/training/events/AntonymShouldBeShown.event';
import { SocketConnectionsService } from '../../../infrastructure-interfaces/network/SocketConnectionsService';
import { TrainingAntonymData } from '../../../infrastructure-interfaces/network/data/TrainingAntonymData';

export class AntonymShouldBeShownEventHandler implements EventHandler<AntonymShouldBeShownEvent> {
  constructor(private readonly socketConnectionsService: SocketConnectionsService) {}

  async handle(event: AntonymShouldBeShownEvent): Promise<void> {
    const data = new TrainingAntonymData({
      trainingId: event.trainingId.value,
      antonym: event.antonym?.value?.value,
    });

    await this.socketConnectionsService.sendData(event.student.id.value, data);

    if (!!event.teacher) {
      await this.socketConnectionsService.sendData(event.teacher.id.value, data);
    }
  }
}
