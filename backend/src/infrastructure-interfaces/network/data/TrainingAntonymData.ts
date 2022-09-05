import { Data } from './Data';

export class TrainingAntonymData extends Data {
  constructor(
    public readonly data: {
      trainingId: String;
      antonym?: String;
    },
  ) {
    super('TrainingAntonym');
  }
}
