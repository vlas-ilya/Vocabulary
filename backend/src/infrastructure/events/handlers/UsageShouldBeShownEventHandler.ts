import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { UsageShouldBeShownEvent } from '../../../domain/core/training/events/UsageShouldBeShown.event';
import { SocketConnectionsService } from '../../../infrastructure-interfaces/network/SocketConnectionsService';
import { TrainingUsageData } from '../../../infrastructure-interfaces/network/data/TrainingUsageData';

export class UsageShouldBeShownEventHandler implements EventHandler<UsageShouldBeShownEvent> {
  constructor(private readonly socketConnectionsService: SocketConnectionsService) {}

  async handle(event: UsageShouldBeShownEvent): Promise<void> {
    const data = new TrainingUsageData({
      trainingId: event.trainingId.value,
      usage: event.usage?.value?.value,
    });

    await this.socketConnectionsService.sendData(event.student.id.value, data);

    if (!!event.teacher) {
      await this.socketConnectionsService.sendData(event.teacher.id.value, data);
    }
  }
}
