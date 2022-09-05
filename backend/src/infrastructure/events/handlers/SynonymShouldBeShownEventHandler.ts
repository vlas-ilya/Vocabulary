import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { SynonymShouldBeShownEvent } from '../../../domain/core/training/events/SynonymShouldBeShown.event';
import { SocketConnectionsService } from '../../../infrastructure-interfaces/network/SocketConnectionsService';
import { TrainingSynonymData } from '../../../infrastructure-interfaces/network/data/TrainingSynonymData';

export class SynonymShouldBeShownEventHandler implements EventHandler<SynonymShouldBeShownEvent> {
  constructor(private readonly socketConnectionsService: SocketConnectionsService) {}

  async handle(event: SynonymShouldBeShownEvent): Promise<void> {
    const data = new TrainingSynonymData({
      trainingId: event.trainingId.value,
      synonym: event.synonym?.value?.value,
    });

    await this.socketConnectionsService.sendData(event.student.id.value, data);

    if (!!event.teacher) {
      await this.socketConnectionsService.sendData(event.teacher.id.value, data);
    }
  }
}
