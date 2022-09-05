import { TrainingProcessor } from '../processor-interfaces/TrainingProcessor';
import { Training, TrainingId } from '../domain/core/training/Training.entity';
import { EventDispatcher } from '../infrastructure-interfaces/events/EventDispatcher';
import { TrainingRepository } from '../repository-interfaces/TrainingRepository';
import { StudentId } from '../domain/core/student/Student.entity';
import { TeacherId } from '../domain/core/teacher/Teacher.entity';
import { WordSetId } from '../domain/other/word/WordSet.entity';
import { CreateNewTrainingServiceRepository } from '../repository-interfaces/CreateNewTrainingServiceRepository';
import { TrainingType } from '../domain/core/training/entities/TrainingParameters.value';

export class TrainingProcessorImpl implements TrainingProcessor {
  constructor(
    private readonly repository: TrainingRepository,
    private readonly createNewTrainingServiceRepository: CreateNewTrainingServiceRepository,
    private readonly eventDispatcher: EventDispatcher,
  ) {}

  async process<RESULT>(id: TrainingId, fun: (entity: Training) => RESULT): Promise<RESULT> {
    const training = await this.repository.getModel(id);
    const result = fun(training);
    await this.eventDispatcher.dispatch(...training.getEvents());
    return result;
  }

  async startNewTraining(
    studentId: StudentId,
    teacherId: TeacherId | null,
    wordSetId: WordSetId,
    trainingType: TrainingType,
  ): Promise<TrainingId> {
    const model = await this.createNewTrainingServiceRepository.getModel(studentId, teacherId, wordSetId, trainingType);
    const trainingId = model.createTraining();
    await this.eventDispatcher.dispatch(...model.getEvents());
    return trainingId;
  }
}
