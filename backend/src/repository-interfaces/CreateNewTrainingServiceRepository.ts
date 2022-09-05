import { CreateNewTrainingService } from '../domain/services/CreateNewTraining/CreateNewTrainingService';
import { StudentId } from '../domain/core/student/Student.entity';
import { TeacherId } from '../domain/core/teacher/Teacher.entity';
import { WordSetId } from '../domain/other/word/WordSet.entity';
import { TrainingType } from '../domain/core/training/entities/TrainingParameters.value';
import { Maybe } from '../domain/other/base/Maybe';

export interface CreateNewTrainingServiceRepository {
  getModel(
    studentId: StudentId,
    teacherId: Maybe<TeacherId>,
    wordSetId: WordSetId,
    trainingType: TrainingType,
  ): Promise<CreateNewTrainingService>;
}
