import { Usage, UsageId, UsageValue } from '../../../domain/other/word/Usage.entity';
import { ConvertingError } from '../../../repository-interfaces/errors/ConvertingError';
import { Dto } from '../common/Dto';

export class UsageDto extends Dto {
  constructor(id: String, public value: String) {
    super(id);
  }

  static convertToEntity(usageDto: UsageDto): Usage {
    if (!usageDto) {
      throw new ConvertingError('entityIsEmpty', 'Usage');
    }
    return new Usage(new UsageId(usageDto.id), new UsageValue(usageDto.value));
  }
}
