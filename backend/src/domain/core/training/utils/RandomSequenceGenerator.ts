import { RandomSequence } from './RandomSequence.vo';
import { Entity } from '../../../other/base/Entity';
import { Id } from '../../../other/base/Id';

export interface RandomSequenceGenerator {
  random<ID extends Id, ENTITY extends Entity<ID>>(list: ENTITY[]): RandomSequence<ID>;
}
