import { Error } from '../../../../utils/Error';
import { WordSet } from '../../../other/word/WordSet.entity';

export class WordSetIsNotFound extends Error {
  readonly wordSet: WordSet;

  constructor(wordSet: WordSet) {
    super();
    this.wordSet = wordSet;
  }
}
