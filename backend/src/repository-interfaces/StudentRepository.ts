import { Repository } from './common/Repository';
import { Student, StudentId } from '../domain/core/student/Student.entity';

export interface StudentRepository extends Repository<StudentId, Student> {}
