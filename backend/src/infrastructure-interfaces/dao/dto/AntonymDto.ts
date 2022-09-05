import { Dto } from '../common/Dto';
import { ConvertingError } from '../../../repository-interfaces/errors/ConvertingError';
import { Antonym, AntonymId, AntonymValue } from '../../../domain/other/word/Antonym.entity';

export class AntonymDto extends Dto {
  constructor(id: String, public value: String) {
    super(id);
  }

  static convertToEntity(antonymDto: AntonymDto): Antonym {
    if (!antonymDto) {
      throw new ConvertingError('entityIsEmpty', 'Antonym');
    }
    return new Antonym(new AntonymId(antonymDto.id), new AntonymValue(antonymDto.value));
  }
}
