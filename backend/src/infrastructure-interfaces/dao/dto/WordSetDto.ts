import { WordDto } from './WordDto';
import { WordSet, WordSetId } from '../../../domain/other/word/WordSet.entity';
import { ConvertingError } from '../../../repository-interfaces/errors/ConvertingError';
import { Dto } from '../common/Dto';

export class WordSetDto extends Dto {
  constructor(id: String, public words: WordDto[], public cloneCount: number) {
    super(id);
  }

  static convertToEntity(wordSetDto: WordSetDto): WordSet {
    if (!wordSetDto) {
      throw new ConvertingError('entityIsEmpty', 'WordSet');
    }
    return new WordSet(
      new WordSetId(wordSetDto.id),
      wordSetDto.words.map((word) => WordDto.convertToEntity(word)),
      wordSetDto.cloneCount,
    );
  }

  static convertFromEntity(wordSet: WordSet): WordSetDto {
    return new WordSetDto(wordSet.id.value, wordSet.words.map(WordDto.convertFromEntity), wordSet.cloneCount);
  }
}
