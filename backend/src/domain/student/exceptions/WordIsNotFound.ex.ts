import { BaseException } from '../../base/BaseException';
import { WordId } from '../Word.e';

export class WordIsNotFound extends BaseException {
  private wordId: WordId;

  constructor(wordId: WordId) {
    super();
    this.wordId = wordId;
  }
}
