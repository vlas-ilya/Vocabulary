export abstract class Data {
  protected constructor(public readonly type: DataType) {}
}

export type DataType =
  | 'Training'
  | 'TrainingAnswerData'
  | 'TrainingAntonym'
  | 'TrainingQuestion'
  | 'TrainingResults'
  | 'TrainingSynonym'
  | 'TrainingUsage';
