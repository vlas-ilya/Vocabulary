import { Processor } from './common/Processor';
import { Training, TrainingId } from '../domain/core/training/Training.entity';
import { StudentId } from '../domain/core/student/Student.entity';
import { TeacherId } from '../domain/core/teacher/Teacher.entity';
import { WordSetId } from '../domain/other/word/WordSet.entity';
import { TrainingType } from '../domain/core/training/entities/TrainingParameters.value';

export interface TrainingProcessor extends Processor<TrainingId, Training> {
  startNewTraining(
    studentId: StudentId,
    teacherId: TeacherId | null,
    wordSetId: WordSetId,
    trainingType: TrainingType,
  ): Promise<TrainingId>;
}
