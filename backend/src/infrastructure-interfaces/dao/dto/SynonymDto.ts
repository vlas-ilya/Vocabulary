import { Dto } from '../common/Dto';
import { ConvertingError } from '../../../repository-interfaces/errors/ConvertingError';
import { Synonym, SynonymId, SynonymValue } from '../../../domain/other/word/Synonym.entity';

export class SynonymDto extends Dto {
  constructor(id: String, public value: String) {
    super(id);
  }

  static convertToEntity(synonymDto: SynonymDto): Synonym {
    if (!synonymDto) {
      throw new ConvertingError('entityIsEmpty', 'Synonym');
    }
    return new Synonym(new SynonymId(synonymDto.id), new SynonymValue(synonymDto.value));
  }
}
