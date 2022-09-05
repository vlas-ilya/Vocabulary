import { RepositoryError } from '../common/RepositoryError';
import { Id } from '../../domain/other/base/Id';

export class ConvertingError<T extends Id> extends RepositoryError {
  constructor(
    public readonly errorType: ConvertingErrorType,
    public readonly entityType: EntityType,
    public readonly id?: Id | String,
  ) {
    super();
  }
}

export type ConvertingErrorType = 'entityIsEmpty' | 'entityHasIncorrectType';
export type EntityType =
  | 'Lesson'
  | 'Student'
  | 'Teacher'
  | 'Word'
  | 'WordSet'
  | 'Training'
  | 'Synonym'
  | 'Antonym'
  | 'Usage';
