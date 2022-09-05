import { UsageIsNotFound } from './exceptions/UsageIsNotFound.error';
import { Entity } from '../base/Entity';
import { Usage, UsageId } from './Usage.entity';
import { Id } from '../base/Id';
import { ValueObject } from '../base/ValueObject';
import { getOrThrowIfEmpty } from '../../../utils/errors';
import { RandomIdGenerator } from '../../../utils/RandomIdGenerator';
import { Antonym, AntonymId } from './Antonym.entity';
import { Synonym, SynonymId } from './Synonym.entity';
import { SynonymIsNotFoundError } from './exceptions/SynonymIsNotFoundError';
import { AntonymIsNotFoundError } from './exceptions/AntonymIsNotFoundError';

export class Word extends Entity<WordId> {
  public readonly value: Value;
  public readonly translation: Translation;
  public readonly usages: Usage[];
  public readonly synonyms: Synonym[];
  public readonly antonyms: Antonym[];
  public readonly transcription?: Transcription;

  constructor(
    id: WordId,
    value: Value,
    translation: Translation,
    usages: Usage[],
    synonyms: Synonym[],
    antonyms: Antonym[],
    transcription?: Transcription,
  ) {
    super(id);
    this.value = value;
    this.translation = translation;
    this.usages = usages;
    this.synonyms = synonyms;
    this.antonyms = antonyms;
    this.transcription = transcription;
  }

  modifyValue(value: Value): Word {
    return this.with({ value });
  }

  modifyTranslation(translation: Translation): Word {
    return this.with({ translation });
  }

  modifyTranscription(transcription: Transcription): Word {
    return this.with({ transcription });
  }

  addUsage(usage: Usage): Word {
    const usages = [...this.usages, usage];
    return this.with({ usages });
  }

  removeUsage(usageId: UsageId): Word {
    const realUsage = getOrThrowIfEmpty(
      this.usages.find((item) => item.equals(usageId)),
      new UsageIsNotFound(usageId),
    );
    const usages = this.usages.filter((item) => !item.equals(realUsage));
    return this.with({ usages });
  }

  modifyUsage(usage: Usage): Word {
    const realUsage = getOrThrowIfEmpty(
      this.usages.find((item) => item.equals(usage)),
      new UsageIsNotFound(usage.id),
    );
    const index = this.usages.findIndex((item) => item.equals(realUsage));
    const usages = [...this.usages.slice(0, index), usage, ...this.usages.slice(index + 1)];
    return this.with({ usages });
  }

  addSynonym(synonym: Synonym): Word {
    const synonyms = [...this.synonyms, synonym];
    return this.with({ synonyms });
  }

  removeSynonym(synonymId: SynonymId): Word {
    const realSynonym = getOrThrowIfEmpty(
      this.synonyms.find((item) => item.equals(synonymId)),
      new SynonymIsNotFoundError(synonymId),
    );
    const synonyms = this.synonyms.filter((item) => !item.equals(realSynonym));
    return this.with({ synonyms });
  }

  modifySynonym(synonym: Synonym): Word {
    const realSynonym = getOrThrowIfEmpty(
      this.synonyms.find((item) => item.equals(synonym)),
      new SynonymIsNotFoundError(synonym.id),
    );
    const index = this.synonyms.findIndex((item) => item.equals(realSynonym));
    const synonyms = [...this.synonyms.slice(0, index), synonym, ...this.synonyms.slice(index + 1)];
    return this.with({ synonyms });
  }

  addAntonym(antonym: Antonym): Word {
    const antonyms = [...this.antonyms, antonym];
    return this.with({ antonyms });
  }

  removeAntonym(antonymId: AntonymId): Word {
    const realAntonym = getOrThrowIfEmpty(
      this.antonyms.find((item) => item.equals(antonymId)),
      new AntonymIsNotFoundError(antonymId),
    );
    const antonyms = this.antonyms.filter((item) => !item.equals(realAntonym));
    return this.with({ antonyms });
  }

  modifyAntonym(antonym: Antonym): Word {
    const realAntonym = getOrThrowIfEmpty(
      this.synonyms.find((item) => item.equals(antonym)),
      new AntonymIsNotFoundError(antonym.id),
    );
    const index = this.antonyms.findIndex((item) => item.equals(realAntonym));
    const antonyms = [...this.antonyms.slice(0, index), antonym, ...this.antonyms.slice(index + 1)];
    return this.with({ antonyms });
  }

  clone(randomIdGenerator: RandomIdGenerator): Word {
    return new Word(
      new WordId(randomIdGenerator.random()),
      new Value(this.value.value),
      new Translation(this.translation.value),
      [],
      [],
      [],
      this.transcription ? new Transcription(this.transcription.value) : undefined,
    );
  }

  private with(params: {
    value?: Value;
    translation?: Translation;
    usages?: Usage[];
    synonyms?: Synonym[];
    antonyms?: Antonym[];
    transcription?: Transcription;
  }): Word {
    return new Word(
      this.id,
      params.value ? params.value : this.value,
      params.translation ? params.translation : this.translation,
      params.usages ? params.usages : this.usages,
      params.synonyms ? params.synonyms : this.synonyms,
      params.antonyms ? params.antonyms : this.antonyms,
      params.transcription ? params.transcription : this.transcription,
    );
  }
}

export class WordId extends Id {}

export class Value extends ValueObject {
  public readonly value: String;

  constructor(value: String) {
    super();
    this.value = value;
  }
}

export class Transcription extends ValueObject {
  public readonly value: String;

  constructor(value: String) {
    super();
    this.value = value;
  }
}

export class Translation extends ValueObject {
  public readonly value: String;

  constructor(value: String) {
    super();
    this.value = value;
  }
}
