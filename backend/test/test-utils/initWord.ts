import { Transcription, Translation, Value, Word, WordId } from '../../src/domain/other/word/Word.entity';
import { Usage, UsageId, UsageValue } from '../../src/domain/other/word/Usage.entity';
import { makeArray } from '../../src/utils/arrays';

export function initWord(
  prefix: String,
  additionalParams?: {
    usageCount?: number;
    withTranscription?: boolean;
    modifiedValue?: Value;
    modifiedTranslation?: Translation;
    modifiedUsages?: Usage[];
    modifiedTranscription?: Transcription;
  },
): Word {
  return new Word(
    new WordId(`${prefix}-id`),
    additionalParams?.modifiedValue ? additionalParams?.modifiedValue : new Value(`${prefix}-value`),
    additionalParams?.modifiedTranslation
      ? additionalParams?.modifiedTranslation
      : new Translation(`${prefix}-translation`),
    additionalParams?.modifiedUsages
      ? additionalParams?.modifiedUsages
      : makeArray(additionalParams?.usageCount ?? 0).map(
          (usageIndex) =>
            new Usage(
              new UsageId(`${prefix}-usage-${usageIndex}`),
              new UsageValue(`${prefix}-usage-${usageIndex}-value`),
            ),
        ),
    [],
    [],
    additionalParams?.modifiedTranscription
      ? additionalParams?.modifiedTranscription
      : additionalParams?.withTranscription
      ? new Transcription(`${prefix}-transcription`)
      : null,
  );
}
