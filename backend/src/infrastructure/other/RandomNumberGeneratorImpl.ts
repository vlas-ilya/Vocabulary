import { RandomNumberGenerator } from '../../infrastructure-interfaces/other/RandomNumberGenerator';

export class RandomNumberGeneratorImpl implements RandomNumberGenerator {
  random(max?: number): number {
    return Math.random() * (max ?? 1);
  }
}
