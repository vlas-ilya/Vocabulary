import { Event } from '../../base/Event';
import { WordSet } from '../WordSet.entity';
import { Id } from '../../base/Id';

export class WordSetsWereChangedEvent extends Event {
  constructor(public readonly wordSets: WordSet[]) {
    super('WordSetsWereChangedEvent');
  }
}
