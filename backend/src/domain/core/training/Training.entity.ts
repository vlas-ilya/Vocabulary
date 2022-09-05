import { TrainingWasStartedEvent } from './events/TrainingWasStarted.event';
import { QuestionShouldBeShownEvent } from './events/QuestionShouldBeShown.event';
import { AnswerShouldBeShownEvent } from './events/AnswerShouldBeShown.event';
import { TrainingStateWasUpdatedEvent } from './events/TrainingStateWasUpdated.event';
import { UsageShouldBeShownEvent } from './events/UsageShouldBeShown.event';
import { Entity } from '../../other/base/Entity';
import { Id } from '../../other/base/Id';
import { TrainingState } from './entities/TrainingState.value';
import { TrainingParameters } from './entities/TrainingParameters.value';
import { SynonymShouldBeShownEvent } from './events/SynonymShouldBeShown.event';
import { AntonymShouldBeShownEvent } from './events/AntonymShouldBeShown.event';
import { WordId } from '../../other/word/Word.entity';
import { ResultsShouldBeShownEvent } from './events/ResultsShouldBeShown.event';

export class Training extends Entity<TrainingId> {
  constructor(
    id: TrainingId,
    private readonly parameters: TrainingParameters,
    private readonly state: TrainingState = new TrainingState(),
  ) {
    super(id);
  }

  start() {
    this.state.initiate(this.parameters.randomizer, this.parameters.wordSet.words);
    this.addEvent(new TrainingWasStartedEvent(this.id, this.parameters.student, this.parameters.teacher));
    this.addEvent(new TrainingStateWasUpdatedEvent(this.id, this.state));
  }

  showNextQuestion(wordId?: WordId) {
    this.state.selectNextWord(wordId);

    switch (this.parameters.trainingType) {
      case 'FromValueToTranslation':
        this.addEvent(
          new QuestionShouldBeShownEvent(this.id, this.parameters.student, this.parameters.teacher, [
            this.state.currentWord.value,
            this.state.currentWord.transcription,
          ]),
        );
        break;
      case 'FromTranslationToValue':
        this.addEvent(
          new QuestionShouldBeShownEvent(
            this.id,
            this.parameters.student,
            this.parameters.teacher,
            this.state.currentWord.translation,
          ),
        );
        break;
      case 'FillTheGaps':
        this.addEvent(
          new QuestionShouldBeShownEvent(
            this.id,
            this.parameters.student,
            this.parameters.teacher,
            this.state.getNextUsage(),
          ),
        );
        break;
    }

    this.addEvent(new TrainingStateWasUpdatedEvent(this.id, this.state));
  }

  showAnswer() {
    switch (this.parameters.trainingType) {
      case 'FromValueToTranslation':
        this.addEvent(
          new AnswerShouldBeShownEvent(
            this.id,
            this.parameters.student,
            this.parameters.teacher,
            this.state.currentWord.translation,
          ),
        );
        break;
      case 'FromTranslationToValue':
        this.addEvent(
          new AnswerShouldBeShownEvent(this.id, this.parameters.student, this.parameters.teacher, [
            this.state.currentWord.value,
            this.state.currentWord.transcription,
          ]),
        );
        break;
      case 'FillTheGaps':
        this.addEvent(
          new AnswerShouldBeShownEvent(this.id, this.parameters.student, this.parameters.teacher, [
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
    this.addEvent(new UsageShouldBeShownEvent(this.id, this.parameters.student, this.parameters.teacher, usage));
    this.addEvent(new TrainingStateWasUpdatedEvent(this.id, this.state));
  }

  showSynonym() {
    const synonym = this.state.getNextSynonym();
    this.addEvent(new SynonymShouldBeShownEvent(this.id, this.parameters.student, this.parameters.teacher, synonym));
    this.addEvent(new TrainingStateWasUpdatedEvent(this.id, this.state));
  }

  showAntonym() {
    const antonym = this.state.getNextAntonym();
    this.addEvent(new AntonymShouldBeShownEvent(this.id, this.parameters.student, this.parameters.teacher, antonym));
    this.addEvent(new TrainingStateWasUpdatedEvent(this.id, this.state));
  }

  finish() {
    this.addEvent(
      new ResultsShouldBeShownEvent(
        this.id,
        this.parameters.student,
        this.parameters.teacher,
        this.state.correctAnswers,
        this.state.incorrectAnswers,
      ),
    );
  }
}

export class TrainingId extends Id {}
