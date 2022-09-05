import { Event } from '../../base/Event';
import { WordSet } from '../WordSet.entity';

export class WordSetWasCreatedEvent extends Event {
  readonly wordSet: WordSet;

  constructor(wordSet: WordSet) {
    super('WordSetWasCreatedEvent');
    this.wordSet = wordSet;
  }
}
