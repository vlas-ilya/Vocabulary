import { RandomSequence } from './RandomSequence';

export interface Randomizer {
  random(max: number): RandomSequence;
}
