import { Event } from '../../base/Event';
import { WordSet } from '../WordSet.entity';

export class WordSetWasClonedEvent extends Event {
  readonly wordSet: WordSet;

  constructor(wordSet: WordSet) {
    super('WordSetWasClonedEvent');
    this.wordSet = wordSet;
  }
}
