import { Data } from './Data';

export class TrainingQuestionData extends Data {
  constructor(
    public readonly data: {
      trainingId: String;
      question:
        | {
            value: String;
            transcription?: String;
          }
        | {
            translation: String;
          }
        | {
            usage: String;
          };
    },
  ) {
    super('TrainingQuestion');
  }
}
