import { WordDto } from './WordDto';
import { RandomSequenceDto } from './RandomSequenceDto';
import { RandomSequenceGenerator } from '../../../domain/core/training/utils/RandomSequenceGenerator';
import { TrainingState } from '../../../domain/core/training/entities/TrainingState.value';
import { WordId } from '../../../domain/other/word/Word.entity';
import { UsageId } from '../../../domain/other/word/Usage.entity';
import { SynonymId } from '../../../domain/other/word/Synonym.entity';
import { AntonymId } from '../../../domain/other/word/Antonym.entity';

export class TrainingStateDto {
  constructor(
    public words: WordDto[],
    public currentWord: WordDto,
    public wordsSequence: RandomSequenceDto,
    public usageSequence: RandomSequenceDto,
    public synonymSequence: RandomSequenceDto,
    public antonymSequence: RandomSequenceDto,
    public correctAnswers: WordDto[],
    public incorrectAnswers: WordDto[],
  ) {}

  static convertToEntity(trainingStateDto: TrainingStateDto, randomizer: RandomSequenceGenerator): TrainingState {
    return new TrainingState().initiateExist(
      randomizer,
      trainingStateDto.words.map(WordDto.convertToEntity),
      WordDto.convertToEntity(trainingStateDto.currentWord),
      RandomSequenceDto.convertToEntity(trainingStateDto.wordsSequence, (id) => new WordId(id)),
      RandomSequenceDto.convertToEntity(trainingStateDto.usageSequence, (id) => new UsageId(id)),
      RandomSequenceDto.convertToEntity(trainingStateDto.synonymSequence, (id) => new SynonymId(id)),
      RandomSequenceDto.convertToEntity(trainingStateDto.antonymSequence, (id) => new AntonymId(id)),
      trainingStateDto.correctAnswers.map(WordDto.convertToEntity),
      trainingStateDto.incorrectAnswers.map(WordDto.convertToEntity),
    );
  }

  static convertFromEntity(trainingState: TrainingState): TrainingStateDto {
    return new TrainingStateDto(
      trainingState.words.map(WordDto.convertFromEntity),
      WordDto.convertFromEntity(trainingState.currentWord),
      RandomSequenceDto.convertFromEntity(trainingState.wordsSequence),
      RandomSequenceDto.convertFromEntity(trainingState.usageSequence),
      RandomSequenceDto.convertFromEntity(trainingState.synonymSequence),
      RandomSequenceDto.convertFromEntity(trainingState.antonymSequence),
      trainingState.correctAnswers.map(WordDto.convertFromEntity),
      trainingState.incorrectAnswers.map(WordDto.convertFromEntity),
    );
  }
}
