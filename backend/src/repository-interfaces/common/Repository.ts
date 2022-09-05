import { Id } from '../../domain/other/base/Id';
import { Entity } from '../../domain/other/base/Entity';

export interface Repository<ID extends Id, ENTITY extends Entity<ID>> {
  getModel(id: ID): Promise<ENTITY>;
}
