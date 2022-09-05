import { ValueObject } from '../../../other/base/ValueObject';
import { RandomSequenceGenerator } from '../utils/RandomSequenceGenerator';
import { Word, WordId } from '../../../other/word/Word.entity';
import { RandomSequence } from '../utils/RandomSequence.vo';
import { Usage, UsageId } from '../../../other/word/Usage.entity';
import { Synonym, SynonymId } from '../../../other/word/Synonym.entity';
import { Antonym, AntonymId } from '../../../other/word/Antonym.entity';
import { ThereIsNoNextWord } from '../errors/ThereIsNoNextWord';
import { Optional } from '../../../../utils/Optional';

export class TrainingState extends ValueObject {
  private randomizer: RandomSequenceGenerator;

  public words: Word[];
  public currentWord: Word;
  public wordsSequence: RandomSequence<WordId>;
  public usageSequence: RandomSequence<UsageId>;
  public synonymSequence: RandomSequence<SynonymId>;
  public antonymSequence: RandomSequence<AntonymId>;
  public correctAnswers: Word[];
  public incorrectAnswers: Word[];

  initiate(randomizer: RandomSequenceGenerator, words: Word[]): this {
    this.randomizer = randomizer;
    this.words = words;

    this.wordsSequence = randomizer.random(this.words);
    this.currentWord = this.nextWordId()
      .map((newWordId) => this.words.find((id) => id.equals(newWordId)))
      .orThrow(new ThereIsNoNextWord());
    this.usageSequence = randomizer.random(this.currentWord.usages);
    this.synonymSequence = randomizer.random(this.currentWord.synonyms);
    this.antonymSequence = randomizer.random(this.currentWord.antonyms);
    this.correctAnswers = [];
    this.incorrectAnswers = [];
    return this;
  }

  initiateExist(
    randomizer: RandomSequenceGenerator,
    words: Word[],
    currentWord: Word,
    wordsSequence: RandomSequence<WordId>,
    usageSequence: RandomSequence<UsageId>,
    synonymSequence: RandomSequence<SynonymId>,
    antonymSequence: RandomSequence<AntonymId>,
    correctAnswers: Word[],
    incorrectAnswers: Word[],
  ): this {
    this.randomizer = randomizer;
    this.words = words;
    this.currentWord = currentWord;
    this.wordsSequence = wordsSequence;
    this.usageSequence = usageSequence;
    this.synonymSequence = synonymSequence;
    this.antonymSequence = antonymSequence;
    this.correctAnswers = correctAnswers;
    this.incorrectAnswers = incorrectAnswers;
    return this;
  }

  getNextUsage(): Usage | null {
    return this.usageSequence
      .next()
      .map((usageId) => this.currentWord.usages.find((id) => id.equals(usageId)))
      .orElse(null);
  }

  getNextSynonym(): Synonym | null {
    return this.synonymSequence
      .next()
      .map((synonymId) => this.currentWord.synonyms.find((id) => id.equals(synonymId)))
      .orElse(null);
  }

  getNextAntonym(): Antonym | null {
    return this.antonymSequence
      .next()
      .map((antonymId) => this.currentWord.antonyms.find((id) => id.equals(antonymId)))
      .orElse(null);
  }

  wasCorrectAnswer() {
    this.correctAnswers.push(this.currentWord);
  }

  wasIncorrectAnswer() {
    this.incorrectAnswers.push(this.currentWord);
  }

  selectNextWord(wordId?: WordId) {
    this.currentWord = this.nextWordId(wordId)
      .map((newWordId) => this.words.find((id) => id.equals(newWordId)))
      .orThrow(new ThereIsNoNextWord());

    this.usageSequence = this.randomizer.random(this.currentWord.usages);
  }

  private nextWordId(wordId?: WordId): Optional<WordId> {
    const wordIdOptional = this.wordsSequence.next(wordId);
    if (wordIdOptional.ifEmpty()) {
      this.wordsSequence = this.randomizer.random(this.words); // TODO: add tests
      return this.wordsSequence.next(wordId);
    }
    return wordIdOptional;
  }
}
