import { ValueObject } from '../../../other/base/ValueObject';
import { StudentForTraining } from './StudentForTraining.entity';
import { TeacherForTraining } from './TeacherForTraining.entity';
import { RandomSequenceGenerator } from '../utils/RandomSequenceGenerator';
import { IncorrectTypeError } from '../../../other/base/errors/IncorrectTypeError';
import { WordSet } from '../../../other/word/WordSet.entity';

export class TrainingParameters extends ValueObject {
  constructor(
    public student: StudentForTraining,
    public teacher: TeacherForTraining,
    public wordSet: WordSet,
    public randomizer: RandomSequenceGenerator,
    public owner: 'Student' | 'Teacher',
    public trainingType: TrainingType,
  ) {
    super();
  }
}

export type TrainingType = 'FromValueToTranslation' | 'FromTranslationToValue' | 'FillTheGaps';

function isTrainingType(value: String): value is TrainingType {
  switch (value) {
    case 'FromValueToTranslation':
    case 'FromTranslationToValue':
    case 'FillTheGaps':
      return true;
  }
  return false;
}

export function toTrainingType(value: String): TrainingType {
  if (isTrainingType(value)) {
    return value;
  }
  throw new IncorrectTypeError('TrainingType', value);
}
