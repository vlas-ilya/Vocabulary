import { BaseId } from '../base/BaseId.vo';
import { BaseEntity } from '../base/BaseEntity';
import { BaseValueObject } from '../base/BaseValueObject';

export class Word extends BaseEntity<WordId> {
  public readonly value: Value;
  public readonly translation: Translation;
  public readonly usages: Usage[];
  public readonly transcription?: Transcription;


  constructor(id: WordId, value: Value, translation: Translation, usages: Usage[], transcription: Transcription) {
    super(id);
    this.value = value;
    this.translation = translation;
    this.usages = usages;
    this.transcription = transcription;
  }
}

export class Value extends BaseValueObject {
  public readonly value: String;

  constructor(value: String) {
    super();
    this.value = value;
  }
}

export class Transcription extends BaseValueObject {
  public readonly value: String;

  constructor(value: String) {
    super();
    this.value = value;
  }
}

export class Usage extends BaseValueObject {
  public readonly value: String;

  constructor(value: String) {
    super();
    this.value = value;
  }
}

export class Translation extends BaseValueObject {
  public readonly value: String;

  constructor(value: String) {
    super();
    this.value = value;
  }
}

export class WordId extends BaseId {}
