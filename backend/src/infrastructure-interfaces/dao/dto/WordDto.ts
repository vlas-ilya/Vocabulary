import { Transcription, Translation, Value, Word, WordId } from '../../../domain/other/word/Word.entity';
import { UsageDto } from './UsageDto';
import { ConvertingError } from '../../../repository-interfaces/errors/ConvertingError';
import { Dto } from '../common/Dto';
import { SynonymDto } from './SynonymDto';
import { AntonymDto } from './AntonymDto';
import { Maybe } from '../../../domain/other/base/Maybe';

export class WordDto extends Dto {
  constructor(
    id: String,
    public value: String,
    public translation: String,
    public usage: UsageDto[],
    public synonyms: SynonymDto[],
    public antonyms: AntonymDto[],
    public transcription: Maybe<String>,
  ) {
    super(id);
  }

  static convertToEntity(wordDto: WordDto): Word {
    if (!wordDto) {
      throw new ConvertingError('entityIsEmpty', 'Word');
    }
    return new Word(
      new WordId(wordDto.id),
      new Value(wordDto.value),
      new Translation(wordDto.translation),
      wordDto.usage.map(UsageDto.convertToEntity),
      wordDto.synonyms.map(SynonymDto.convertToEntity),
      wordDto.antonyms.map(AntonymDto.convertToEntity),
      wordDto.transcription ? new Transcription(wordDto.transcription) : null,
    );
  }

  static convertFromEntity(word: Word): WordDto {
    return new WordDto(
      word.id.value,
      word.value.value,
      word.translation.value,
      word.usages.map((usage) => new UsageDto(usage.id.value, usage.value.value)),
      word.synonyms.map((synonym) => new SynonymDto(synonym.id.value, synonym.value.value)),
      word.antonyms.map((antonym) => new AntonymDto(antonym.id.value, antonym.value.value)),
      word.transcription ? word.transcription.value : undefined,
    );
  }
}
