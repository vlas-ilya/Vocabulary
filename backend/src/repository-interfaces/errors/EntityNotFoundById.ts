import { Id } from '../../domain/other/base/Id';
import { RepositoryError } from '../common/RepositoryError';

export class EntityNotFoundById<T extends Id> extends RepositoryError {
  readonly entityType: EntityType;
  readonly id: Id | String;

  constructor(entityType: EntityType, id: Id | String) {
    super();
    this.entityType = entityType;
    this.id = id;
  }
}

export type EntityType = 'Lesson' | 'User' | 'Student' | 'Teacher' | 'Word' | 'WordSet' | 'Training';
