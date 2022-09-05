import { Data } from './Data';

export class TrainingData extends Data {
  constructor(
    public readonly data: {
      trainingId: String;
    },
  ) {
    super('Training');
  }
}
