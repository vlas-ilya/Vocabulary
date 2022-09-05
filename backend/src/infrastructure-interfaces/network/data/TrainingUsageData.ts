import { Data } from './Data';

export class TrainingUsageData extends Data {
  constructor(
    public readonly data: {
      trainingId: String;
      usage?: String;
    },
  ) {
    super('TrainingUsage');
  }
}
