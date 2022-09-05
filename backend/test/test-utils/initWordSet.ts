import { Word, WordId } from '../../src/domain/other/word/Word.entity';
import { WordSet, WordSetId } from '../../src/domain/other/word/WordSet.entity';
import { makeArray } from '../../src/utils/arrays';
import { initWord } from './initWord';

export function initWordSet(
  prefix: String,
  wordsCount: number,
  additionalParams?: {
    usageCount?: number;
    withTranscription?: boolean;
    removeWord?: WordId;
    additionalWord?: Word;
    modifiedWord?: {
      wordId: WordId;
      word: Word;
    };
  },
): WordSet {
  return new WordSet(
    new WordSetId(`${prefix}-set`),
    [
      ...makeArray(wordsCount ?? 0)
        .map((index) =>
          initWord(`${prefix}-word-${index}`, {
            usageCount: additionalParams?.usageCount,
            withTranscription: additionalParams?.withTranscription,
          }),
        )
        .map((word) => {
          if (word.equals(additionalParams?.modifiedWord?.wordId)) {
            return additionalParams?.modifiedWord?.word;
          }
          return word;
        })
        .filter((word) => !word.equals(additionalParams?.removeWord)),
      additionalParams?.additionalWord ? additionalParams?.additionalWord : null,
    ].filter((item) => item),
    0,
  );
}
