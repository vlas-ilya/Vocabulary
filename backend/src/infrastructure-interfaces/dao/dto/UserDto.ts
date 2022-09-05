import { Dto } from '../common/Dto';
import { ProfileDto } from './ProfileDto';
import { WordSetDto } from './WordSetDto';
import { Student, StudentId } from '../../../domain/core/student/Student.entity';
import { ConvertingError } from '../../../repository-interfaces/errors/ConvertingError';
import { Profile } from '../../../domain/other/profile/Profile.value';
import { StudentForLesson } from '../../../domain/core/lesson/entities/StudentForLesson.entity';
import { StudentForTeacher } from '../../../domain/core/teacher/entities/StudentForTeacher.entity';
import { Teacher, TeacherId } from '../../../domain/core/teacher/Teacher.entity';
import { TeacherForLesson } from '../../../domain/core/lesson/entities/TeacherForLesson.entity';
import { StudentForTraining } from '../../../domain/core/training/entities/StudentForTraining.entity';
import { TeacherForTraining } from '../../../domain/core/training/entities/TeacherForTraining.entity';
import { RandomIdGenerator } from '../../../utils/RandomIdGenerator';
import { Name } from '../../../domain/other/profile/Name.value';
import { Gender } from '../../../domain/other/profile/Gender.value';
import { Age } from '../../../domain/other/profile/Age.value';

export class UserDto extends Dto {
  constructor(
    id: String,
    public type: 'Teacher' | 'Student',
    public password: String,
    public profile: ProfileDto,
    public studentIds: String[],
    public wordSetIds: String[],
  ) {
    super(id);
  }

  static async convertToStudent(
    userDto: UserDto,
    wordSetsDto: WordSetDto[],
    randomIdGenerator: RandomIdGenerator,
  ): Promise<Student> {
    if (userDto.type != 'Student') {
      throw new ConvertingError('entityHasIncorrectType', 'Student', userDto.id);
    }
    const wordSets = wordSetsDto.map(WordSetDto.convertToEntity);

    return new Student(
      new StudentId(userDto.id),
      new Profile(new Name(userDto.profile?.name), new Gender(userDto.profile?.gender), new Age(userDto.profile?.age)),
      wordSets,
      randomIdGenerator,
    );
  }

  static convertToStudentForLesson(userDto: UserDto): StudentForLesson {
    if (userDto.type != 'Student') {
      throw new ConvertingError('entityHasIncorrectType', 'Student', userDto.id);
    }
    return new StudentForLesson(new StudentId(userDto.id));
  }

  static convertToStudentForTeacher(userDto: UserDto): StudentForTeacher {
    if (userDto.type != 'Student') {
      throw new ConvertingError('entityHasIncorrectType', 'Student', userDto.id);
    }
    return new StudentForTeacher(new StudentId(userDto.id));
  }

  static convertToTeacher(
    userDto: UserDto,
    studentsDto: UserDto[],
    wordSetsDto: WordSetDto[],
    randomIdGenerator: RandomIdGenerator,
  ): Teacher {
    if (userDto.type != 'Teacher') {
      throw new ConvertingError('entityHasIncorrectType', 'Teacher', userDto.id);
    }

    const students = studentsDto.map(UserDto.convertToStudentForTeacher);

    const wordSets = wordSetsDto.map(WordSetDto.convertToEntity);

    return new Teacher(
      new TeacherId(userDto.id),
      new Profile(new Name(userDto.profile?.name), new Gender(userDto.profile?.gender), new Age(userDto.profile?.age)),
      students,
      wordSets,
      randomIdGenerator,
    );
  }

  static convertToTeacherForLesson(userDto: UserDto): TeacherForLesson {
    if (userDto.type != 'Teacher') {
      throw new ConvertingError('entityHasIncorrectType', 'Teacher', userDto.id);
    }
    return new TeacherForLesson(new TeacherId(userDto.id));
  }

  static convertToStudentForTraining(userDto: UserDto): StudentForTraining {
    if (userDto.type != 'Student') {
      throw new ConvertingError('entityHasIncorrectType', 'Student', userDto.id);
    }
    return new StudentForTraining(new TeacherId(userDto.id));
  }

  static convertToTeacherForTraining(userDto: UserDto): TeacherForTraining {
    if (userDto.type != 'Teacher') {
      throw new ConvertingError('entityHasIncorrectType', 'Teacher', userDto.id);
    }
    return new TeacherForTraining(new TeacherId(userDto.id));
  }
}
