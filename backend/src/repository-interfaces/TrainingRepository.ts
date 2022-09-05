import { Repository } from './common/Repository';
import { Training, TrainingId } from '../domain/core/training/Training.entity';

export interface TrainingRepository extends Repository<TrainingId, Training> {}
