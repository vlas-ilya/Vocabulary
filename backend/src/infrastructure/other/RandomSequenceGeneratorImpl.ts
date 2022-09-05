import { RandomSequenceGenerator } from '../../domain/core/training/utils/RandomSequenceGenerator';
import { RandomSequence } from '../../domain/core/training/utils/RandomSequence.vo';
import { Entity } from '../../domain/other/base/Entity';
import { Id } from '../../domain/other/base/Id';
import { RandomNumberGenerator } from '../../infrastructure-interfaces/other/RandomNumberGenerator';

export class RandomSequenceGeneratorImpl implements RandomSequenceGenerator {
  constructor(private readonly randomGenerator: RandomNumberGenerator) {}

  random<ID extends Id, ENTITY extends Entity<ID>>(list: ENTITY[]): RandomSequence<ID> {
    const ids = list.map((item) => item.id);
    ids.sort(() => 0.5 - this.randomGenerator.random(1));
    return new RandomSequence<ID>(ids);
  }
}
