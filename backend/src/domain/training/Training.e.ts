import { BaseEntity } from '../base/BaseEntity';
import { BaseId } from '../base/BaseId.vo';
import { Student } from './Student.e';
import { Teacher } from './Teacher.e';
import { Word } from './Word.e';
import { Randomizer } from './utils/Randomizer';
import { RandomSequence } from './utils/RandomSequence';
import { TrainingWasStartedEvent } from './events/TrainingWasStarted.event';
import { QuestionShouldBeShownEvent } from './events/QuestionShouldBeShown.event';
import { AnswerShouldBeShownEvent } from './events/AnswerShouldBeShown.event';
import { BaseValueObject } from '../base/BaseValueObject';
import { TrainingStateWasUpdatedEvent } from './events/TrainingStateWasUpdated.event';
import { UsageShouldBeShownEvent } from './events/UsageShouldBeShown.event';

export class Training extends BaseEntity<TrainingId> {
  private readonly student: Student;
  private readonly teacher?: Teacher;
  private readonly words: Word[];
  private readonly randomizer: Randomizer;
  private readonly owner: 'Student' | 'Teacher';
  private readonly lessonType: 'FromValueToTranslation' | 'FromTranslationToValue' | 'FillTheGaps';
  private readonly state: TrainingState;

  constructor(params: {
    id: TrainingId;
    student: Student;
    teacher?: Teacher;
    words: Word[];
    randomizer: Randomizer;
    owner: 'Student' | 'Teacher';
    lessonType: 'FromValueToTranslation' | 'FromTranslationToValue' | 'FillTheGaps';
    state: TrainingState;
  }) {
    super(params.id);
    this.student = params.student;
    this.teacher = params.teacher;
    this.words = params.words;
    this.randomizer = params.randomizer;
    this.owner = params.owner;
    this.lessonType = params.lessonType;
    this.state = params.state;
  }

  start() {
    this.state.initiate(this.randomizer, this.words);
    this.addEvent(new TrainingWasStartedEvent(this.id, this.student, this.teacher));
    this.addEvent(new TrainingStateWasUpdatedEvent(this.id, this.state));
  }

  showNextQuestion() {
    switch (this.lessonType) {
      case 'FromValueToTranslation':
        this.addEvent(
          new QuestionShouldBeShownEvent(this.id, this.student, this.teacher, [
            this.state.currentWord.value,
            this.state.currentWord.transcription,
          ]),
        );
        break;
      case 'FromTranslationToValue':
        this.addEvent(
          new QuestionShouldBeShownEvent(this.id, this.student, this.teacher, this.state.currentWord.translation),
        );
        break;
      case 'FillTheGaps':
        this.addEvent(new QuestionShouldBeShownEvent(this.id, this.student, this.teacher, this.state.getNextUsage()));
        this.addEvent(new TrainingStateWasUpdatedEvent(this.id, this.state));
        break;
    }
  }

  showAnswer() {
    switch (this.lessonType) {
      case 'FromValueToTranslation':
        this.addEvent(
          new AnswerShouldBeShownEvent(this.id, this.student, this.teacher, this.state.currentWord.translation),
        );
        break;
      case 'FromTranslationToValue':
        this.addEvent(
          new AnswerShouldBeShownEvent(this.id, this.student, this.teacher, [
            this.state.currentWord.value,
            this.state.currentWord.transcription,
          ]),
        );
        break;
      case 'FillTheGaps':
        this.addEvent(
          new AnswerShouldBeShownEvent(this.id, this.student, this.teacher, [
            this.state.currentWord.value,
            this.state.currentWord.transcription,
          ]),
        );
        break;
    }
  }

  wasCorrectAnswer() {
    this.state.wasCorrectAnswer();
    this.addEvent(new TrainingStateWasUpdatedEvent(this.id, this.state));
  }

  wasIncorrectAnswer() {
    this.state.wasIncorrectAnswer();
    this.addEvent(new TrainingStateWasUpdatedEvent(this.id, this.state));
  }

  showUsage() {
    const usage = this.state.getNextUsage();
    this.addEvent(new UsageShouldBeShownEvent(this.id, this.student, this.teacher, usage));
    this.addEvent(new TrainingStateWasUpdatedEvent(this.id, this.state));
  }

  finish(): [Word[], Word[]] {
    return [this.state.correctAnswers, this.state.incorrectAnswers];
  }
}

export class TrainingId extends BaseId {}

export class TrainingState extends BaseValueObject {
  private randomizer: Randomizer;
  private words: Word[];

  public currentWord: Word;
  public wordsSequence: RandomSequence;
  public usageSequence: RandomSequence;
  public correctAnswers: Word[];
  public incorrectAnswers: Word[];

  initiate(randomizer: Randomizer, words: Word[]) {
    this.randomizer = randomizer;
    this.words = words;

    this.wordsSequence = randomizer.random(this.words.length);
    this.currentWord = this.words[this.wordsSequence.next()];
    this.usageSequence = randomizer.random(this.currentWord.usages.length);
    this.correctAnswers = [];
    this.incorrectAnswers = [];
  }

  initiateExist(
    randomizer: Randomizer,
    words: Word[],
    currentWord: Word,
    wordsSequence: RandomSequence,
    usageSequence: RandomSequence,
    correctAnswers: Word[],
    incorrectAnswers: Word[],
  ): this {
    this.randomizer = randomizer;
    this.words = words;
    this.currentWord = currentWord;
    this.wordsSequence = wordsSequence;
    this.usageSequence = usageSequence;
    this.correctAnswers = correctAnswers;
    this.incorrectAnswers = incorrectAnswers;
    return this;
  }

  getNextUsage() {
    return this.currentWord.usages[this.usageSequence.next()];
  }

  wasCorrectAnswer() {
    this.correctAnswers.push(this.currentWord);
    this.selectNextWord();
  }

  wasIncorrectAnswer() {
    this.incorrectAnswers.push(this.currentWord);
    this.selectNextWord();
  }

  private selectNextWord() {
    this.currentWord = this.words[this.wordsSequence.next()];
    this.usageSequence = this.randomizer.random(this.currentWord.usages.length);
  }
}
