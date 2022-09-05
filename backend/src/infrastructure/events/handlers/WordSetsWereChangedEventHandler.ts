import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { WordSetsWereChangedEvent } from '../../../domain/other/word/events/WordSetsWereChanged.event';
import { WordSetDao } from '../../../infrastructure-interfaces/dao/WordSetDao';
import { WordSet } from '../../../domain/other/word/WordSet.entity';
import { EntityNotFoundById } from '../../../repository-interfaces/errors/EntityNotFoundById';
import { WordDto } from '../../../infrastructure-interfaces/dao/dto/WordDto';
import { WordSetDto } from '../../../infrastructure-interfaces/dao/dto/WordSetDto';

export class WordSetsWereChangedEventHandler implements EventHandler<WordSetsWereChangedEvent> {
  constructor(private readonly wordSetDao: WordSetDao) {}

  async handle(event: WordSetsWereChangedEvent): Promise<void> {
    await Promise.all(event.wordSets.map(this.saveWordSet));
  }

  private async saveWordSet(wordSet: WordSet) {
    const wordSetDto = (await this.wordSetDao.findById(wordSet.id.value)).orThrow(
      new EntityNotFoundById('WordSet', wordSet.id),
    );

    await this.wordSetDao.save(
      new WordSetDto(wordSetDto.id, wordSet.words.map(WordDto.convertFromEntity), wordSet.cloneCount),
    );
  }
}
