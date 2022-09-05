import { DomainService } from '../../other/base/DomainService';
import { StudentForTeacher } from '../../core/teacher/entities/StudentForTeacher.entity';
import { Teacher } from '../../core/teacher/Teacher.entity';

export class AddStudentToTeacherService extends DomainService {
  constructor(private readonly teacher: Teacher, private readonly student: StudentForTeacher) {
    super();
  }

  addStudent() {
    this.teacher.addStudent(this.student);
    this.addEvent(...this.teacher.getEvents());
  }
}
