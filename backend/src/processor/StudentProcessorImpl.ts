import { StudentProcessor } from '../processor-interfaces/StudentProcessor';
import { Student, StudentId } from '../domain/core/student/Student.entity';
import { EventDispatcher } from '../infrastructure-interfaces/events/EventDispatcher';
import { StudentRepository } from '../repository-interfaces/StudentRepository';

export class StudentProcessorImpl implements StudentProcessor {
  constructor(private readonly repository: StudentRepository, private readonly eventDispatcher: EventDispatcher) {}

  async process<RESULT>(id: StudentId, fun: (entity: Student) => RESULT): Promise<RESULT> {
    const student = await this.repository.getModel(id);
    const result = fun(student);
    await this.eventDispatcher.dispatch(...student.getEvents());
    return result;
  }
}
