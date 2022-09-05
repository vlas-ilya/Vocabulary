import { Data } from './Data';

export class TrainingSynonymData extends Data {
  constructor(
    public readonly data: {
      trainingId: String;
      synonym?: String;
    },
  ) {
    super('TrainingSynonym');
  }
}
