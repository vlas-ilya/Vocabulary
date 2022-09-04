import { BaseValueObject } from '../base/BaseValueObject';
import { UsageIsNotFound } from './exceptions/UsageIsNotFound.ex';
import { BaseEntity } from '../base/BaseEntity';
import { BaseId } from '../base/BaseId.vo';

export class Word extends BaseEntity<WordId> {
  public readonly value: Value;
  public readonly translation: Translation;
  public readonly usages: Usage[];
  public readonly transcription?: Transcription;

  constructor(id: WordId, value: Value, translation: Translation, usages: Usage[], transcription?: Transcription) {
    super(id);
    this.value = value;
    this.transcription = transcription;
    this.usages = usages;
    this.transcription = transcription;
  }

  modifyValue(value: Value): Word {
    return new Word(this.id, value, this.translation, this.usages, this.transcription);
  }

  modifyTranslation(translation: Translation): Word {
    return new Word(this.id, this.value, translation, this.usages, this.transcription);
  }

  modifyTranscription(transcription: Transcription): Word {
    return new Word(this.id, this.value, this.translation, this.usages, transcription);
  }

  addUsage(usage: Usage): Word {
    const newUsage = [...this.usages, usage];
    return new Word(this.id, this.value, this.translation, newUsage, this.transcription);
  }

  removeUsage(usage: UsageId): Word {
    const realUsage = this.usages.find((item) => item.equals(usage));
    if (!realUsage) {
      throw new UsageIsNotFound(usage);
    }
    const newUsages = this.usages.filter((item) => !item.equals(realUsage));
    return new Word(this.id, this.value, this.translation, newUsages, this.transcription);
  }

  modifyUsage(usage: Usage): Word {
    const realUsage = this.usages.find((item) => item.equals(usage));
    if (!realUsage) {
      throw new UsageIsNotFound(usage.id);
    }
    const index = this.usages.findIndex((item) => item.equals(realUsage));
    const newUsages = [...this.usages.slice(0, index), usage, ...this.usages.slice(index + 1)];
    return new Word(this.id, this.value, this.translation, newUsages, this.transcription);
  }
}

export class WordId extends BaseId {}

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

export class Translation extends BaseValueObject {
  public readonly value: String;

  constructor(value: String) {
    super();
    this.value = value;
  }
}

export class Usage extends BaseEntity<UsageId> {
  public readonly value: String;

  constructor(id: UsageId, value: String) {
    super(id);
    this.value = value;
  }
}

export class UsageId extends BaseId {}
