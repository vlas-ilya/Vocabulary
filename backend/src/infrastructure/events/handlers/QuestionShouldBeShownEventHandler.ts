import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { QuestionShouldBeShownEvent } from '../../../domain/core/training/events/QuestionShouldBeShown.event';
import { SocketConnectionsService } from '../../../infrastructure-interfaces/network/SocketConnectionsService';
import { TrainingQuestionData } from '../../../infrastructure-interfaces/network/data/TrainingQuestionData';
import { Translation } from '../../../domain/other/word/Word.entity';

export class QuestionShouldBeShownEventHandler implements EventHandler<QuestionShouldBeShownEvent> {
  constructor(private readonly socketConnectionsService: SocketConnectionsService) {}

  async handle(event: QuestionShouldBeShownEvent): Promise<void> {
    const data = new TrainingQuestionData({
      trainingId: event.trainingId.value,
      question: Array.isArray(event.question)
        ? {
            value: event.question[0].value,
            transcription: event.question[1]?.value,
          }
        : event.question instanceof Translation
        ? {
            translation: event.question?.value,
          }
        : {
            usage: event.question?.value?.value,
          },
    });

    await this.socketConnectionsService.sendData(event.student.id.value, data);

    if (!!event.teacher) {
      await this.socketConnectionsService.sendData(event.teacher.id.value, data);
    }
  }
}
