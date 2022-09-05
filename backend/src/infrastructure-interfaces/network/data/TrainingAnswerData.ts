import { Data } from './Data';

export class TrainingAnswerData extends Data {
  constructor(
    public readonly data: {
      trainingId: String;
      answer:
        | {
            value: String;
            transcription?: String;
          }
        | {
            translation: String;
          };
    },
  ) {
    super('TrainingAnswerData');
  }
}
