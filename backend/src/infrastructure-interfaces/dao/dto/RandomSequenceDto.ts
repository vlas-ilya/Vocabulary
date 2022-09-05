import { RandomSequence } from '../../../domain/core/training/utils/RandomSequence.vo';
import { Id } from '../../../domain/other/base/Id';

export class RandomSequenceDto {
  constructor(public ids: String[]) {}

  static convertToEntity<T extends Id>(
    randomSequenceDto: RandomSequenceDto,
    convert: (String) => T,
  ): RandomSequence<T> {
    return new RandomSequence(randomSequenceDto.ids.map(convert));
  }

  static convertFromEntity<T extends Id>(randomSequence: RandomSequence<T>): RandomSequenceDto {
    return new RandomSequenceDto(randomSequence.list.map((id) => id.value));
  }
}
