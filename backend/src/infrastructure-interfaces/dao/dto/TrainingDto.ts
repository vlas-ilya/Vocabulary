import { Dto } from '../common/Dto';
import { TrainingStateDto } from './TrainingStateDto';
import { Training, TrainingId } from '../../../domain/core/training/Training.entity';
import { UserDto } from './UserDto';
import { WordSetDto } from './WordSetDto';
import { RandomSequenceGenerator } from '../../../domain/core/training/utils/RandomSequenceGenerator';
import { TrainingType } from '../../../domain/core/training/entities/TrainingParameters.value';
import { WordSet } from '../../../domain/other/word/WordSet.entity';

export class TrainingDto extends Dto {
  constructor(
    id: String,
    public studentId: String,
    public teacherId: String,
    public wordSetId: String,
    public owner: 'Student' | 'Teacher',
    public trainingType: TrainingType,
    public state: TrainingStateDto,
  ) {
    super(id);
  }

  static convertToEntity(
    trainingDto: TrainingDto,
    studentDto: UserDto,
    teacherDto: UserDto,
    wordSetDto: WordSetDto,
    randomizer: RandomSequenceGenerator,
  ): Training {
    const trainingId = new TrainingId(trainingDto.id);
    const student = UserDto.convertToStudentForTraining(studentDto);
    const teacher = teacherDto ? UserDto.convertToTeacherForTraining(teacherDto) : undefined;
    const wordSet = WordSetDto.convertToEntity(wordSetDto);

    return new Training(
      trainingId,
      {
        student,
        teacher,
        wordSet,
        randomizer: randomizer,
        owner: trainingDto.owner,
        trainingType: trainingDto.trainingType,
      },
      TrainingStateDto.convertToEntity(trainingDto.state, randomizer),
    );
  }
}
