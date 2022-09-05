import { Dto } from '../common/Dto';
import { UserDto } from './UserDto';
import { WordSetDto } from './WordSetDto';
import { RandomIdGenerator } from '../../../utils/RandomIdGenerator';
import { Lesson, LessonId } from '../../../domain/core/lesson/Lesson.entity';
import { Maybe } from '../../../domain/other/base/Maybe';

export class LessonDto extends Dto {
  constructor(id: String, public studentId: String, public teacherId: Maybe<String>, public wordSetId: String) {
    super(id);
  }

  static convertToEntity(
    lessonDto: LessonDto,
    studentDto: UserDto,
    teacherDto: UserDto,
    wordSetDto: WordSetDto,
    randomIdGenerator: RandomIdGenerator,
  ): Lesson {
    const lessonId = new LessonId(lessonDto.id);
    const student = UserDto.convertToStudentForLesson(studentDto);
    const teacher = teacherDto ? UserDto.convertToTeacherForLesson(teacherDto) : undefined;
    const wordSet = WordSetDto.convertToEntity(wordSetDto);

    return new Lesson(lessonId, student, teacher, wordSet, randomIdGenerator);
  }
}
