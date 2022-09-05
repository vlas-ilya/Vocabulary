import { Error } from '../../../../utils/Error';
import { WordId } from '../../../other/word/Word.entity';

export class WordIsNotFound extends Error {
  readonly wordId: WordId;

  constructor(wordId: WordId) {
    super();
    this.wordId = wordId;
  }
}
