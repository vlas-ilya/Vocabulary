import {Word, WordId} from './Word.e';
import { WordIsNotFound } from './exceptions/WordIsNotFound.ex';
import { BaseEntity } from '../base/BaseEntity';
import {BaseId} from "../base/BaseId.vo";

export class WordSet extends BaseEntity<WordSetId> {
  public readonly words: Word[];

  constructor(id: WordSetId, words: Word[]) {
    super(id);
    this.words = words;
  }

  contains(wordId: WordId): boolean {
    return !!this.words.find((item) => item.equals(wordId));
  }

  addWord(word: Word): WordSet {
    return new WordSet(this.id, [...this.words, word]);
  }

  removeWord(wordId: WordId): WordSet {
    const realWord = this.words.find((item) => item.equals(wordId));
    if (!realWord) {
      throw new WordIsNotFound(wordId);
    }
    const words = this.words.filter((item) => !item.equals(wordId));
    return new WordSet(this.id, words);
  }

  modifyWord(word: Word): WordSet {
    const realWord = this.words.find((item) => item.equals(word));
    if (!realWord) {
      throw new WordIsNotFound(word.id);
    }
    const index = this.words.findIndex((item) => item.equals(realWord));
    const words = [...this.words.slice(0, index), word, ...this.words.slice(index + 1)];
    return new WordSet(this.id, words);
  }

  findWord(wordId: WordId): Word {
    return this.words.find(item => item.equals(wordId))
  }
}

export class WordSetId extends BaseId {}
