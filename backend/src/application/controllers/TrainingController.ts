import { TrainingProcessor } from '../../processor-interfaces/TrainingProcessor';
import { StudentId } from '../../domain/core/student/Student.entity';
import { TeacherId } from '../../domain/core/teacher/Teacher.entity';
import { WordSetId } from '../../domain/other/word/WordSet.entity';
import { TrainingId } from '../../domain/core/training/Training.entity';
import { toTrainingType } from '../../domain/core/training/entities/TrainingParameters.value';
import { Response } from './common/Response';
import { WordId } from '../../domain/other/word/Word.entity';
import { Maybe } from '../../domain/other/base/Maybe';

export class TrainingController {
  constructor(private readonly processor: TrainingProcessor) {}

  async createNewTraining(
    studentId: String,
    teacherId: Maybe<String>,
    wordSetId: String,
    trainingType: String,
  ): Promise<Response<TrainingId>> {
    return await new Response<TrainingId>().run(() =>
      this.processor.startNewTraining(
        new StudentId(studentId),
        teacherId ? new TeacherId(teacherId) : null,
        new WordSetId(wordSetId),
        toTrainingType(trainingType),
      ),
    );
  }

  async startTraining(trainingId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TrainingId(trainingId), (training) => training.start()),
    );
  }

  async showNextQuestion(trainingId: String, wordId?: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TrainingId(trainingId), (training) =>
        training.showNextQuestion(wordId ? new WordId(wordId) : null),
      ),
    );
  }

  async showUsage(trainingId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TrainingId(trainingId), (training) => training.showUsage()),
    );
  }

  async showSynonym(trainingId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TrainingId(trainingId), (training) => training.showSynonym()),
    );
  }

  async showAntonym(trainingId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TrainingId(trainingId), (training) => training.showAntonym()),
    );
  }

  async showAnswer(trainingId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TrainingId(trainingId), (training) => training.showAnswer()),
    );
  }

  async wasCorrectAnswer(trainingId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TrainingId(trainingId), (training) => training.wasCorrectAnswer()),
    );
  }

  async wasIncorrectAnswer(trainingId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TrainingId(trainingId), (training) => training.wasIncorrectAnswer()),
    );
  }

  async finish(trainingId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TrainingId(trainingId), (training) => training.finish()),
    );
  }
}
