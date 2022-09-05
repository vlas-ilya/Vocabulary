import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { AnswerShouldBeShownEvent } from '../../../domain/core/training/events/AnswerShouldBeShown.event';
import { SocketConnectionsService } from '../../../infrastructure-interfaces/network/SocketConnectionsService';
import { TrainingAnswerData } from '../../../infrastructure-interfaces/network/data/TrainingAnswerData';

export class AnswerShouldBeShownEventHandler implements EventHandler<AnswerShouldBeShownEvent> {
  constructor(private readonly socketConnectionsService: SocketConnectionsService) {}

  async handle(event: AnswerShouldBeShownEvent): Promise<void> {
    const data = new TrainingAnswerData({
      trainingId: event.trainingId.value,
      answer: Array.isArray(event.answer)
        ? {
            value: event.answer[0].value,
            transcription: event.answer[1]?.value,
          }
        : {
            translation: event.answer?.value,
          },
    });

    await this.socketConnectionsService.sendData(event.student.id.value, data);

    if (!!event.teacher) {
      await this.socketConnectionsService.sendData(event.teacher.id.value, data);
    }
  }
}
