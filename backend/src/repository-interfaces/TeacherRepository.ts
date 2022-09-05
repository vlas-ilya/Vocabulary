import { Repository } from './common/Repository';
import { Teacher, TeacherId } from '../domain/core/teacher/Teacher.entity';

export interface TeacherRepository extends Repository<TeacherId, Teacher> {}
