import { Event } from '../../base/Event';
import { WordSet } from '../WordSet.entity';
import { Id } from '../../base/Id';

export class WordSetWasChangedEvent extends Event {
  constructor(public readonly wordSet: WordSet) {
    super('WordSetsWereChangedEvent');
  }
}
