import { Entity } from '../../domain/other/base/Entity';
import { Id } from '../../domain/other/base/Id';

export interface Processor<ID extends Id, ENTITY extends Entity<ID>> {
  process<RESULT>(id: ID, fun: (entity: ENTITY) => RESULT): Promise<RESULT>;
}
