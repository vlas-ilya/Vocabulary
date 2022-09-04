import { BaseException } from '../../base/BaseException';
import { WordSet } from '../WordSet.e';

export class WordSetIsNotFound extends BaseException {
  private wordSet: WordSet;

  constructor(wordSet: WordSet) {
    super();
    this.wordSet = wordSet;
  }
}
