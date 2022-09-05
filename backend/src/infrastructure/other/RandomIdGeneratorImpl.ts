import { uuid } from 'uuidv4';

import { RandomIdGenerator } from '../../utils/RandomIdGenerator';

export class RandomIdGeneratorImpl implements RandomIdGenerator {
  random(): String {
    return uuid();
  }
}
