import { TeacherProcessor } from '../processor-interfaces/TeacherProcessor';
import { Teacher, TeacherId } from '../domain/core/teacher/Teacher.entity';
import { EventDispatcher } from '../infrastructure-interfaces/events/EventDispatcher';
import { TeacherRepository } from '../repository-interfaces/TeacherRepository';
import { AddStudentToTeacherServiceRepository } from '../repository-interfaces/AddStudentToTeacherServiceRepository';
import { StudentId } from '../domain/core/student/Student.entity';

export class TeacherProcessorImpl implements TeacherProcessor {
  constructor(
    private readonly repository: TeacherRepository,
    private readonly addStudentToTeacherServiceRepository: AddStudentToTeacherServiceRepository,
    private readonly eventDispatcher: EventDispatcher,
  ) {}

  async process<RESULT>(id: TeacherId, fun: (entity: Teacher) => RESULT): Promise<RESULT> {
    const teacher = await this.repository.getModel(id);
    const result = fun(teacher);
    await this.eventDispatcher.dispatch(...teacher.getEvents());
    return result;
  }

  async addStudent(teacherId: TeacherId, studentId: StudentId): Promise<void> {
    const addStudentToTeacherService = await this.addStudentToTeacherServiceRepository.getModel(teacherId, studentId);
    addStudentToTeacherService.addStudent();
    await this.eventDispatcher.dispatch(...addStudentToTeacherService.getEvents());
  }
}
