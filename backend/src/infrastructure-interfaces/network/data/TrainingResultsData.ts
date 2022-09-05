import { Data } from './Data';

export class TrainingResultsData extends Data {
  constructor(
    public readonly data: {
      trainingId: String;
      correctAnswers: {
        value: String;
      }[];
      incorrectAnswers: {
        value: String;
      }[];
    },
  ) {
    super('TrainingResults');
  }
}
