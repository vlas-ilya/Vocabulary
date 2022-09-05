import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { WordSetWasChangedEvent } from '../../../domain/other/word/events/WordSetWasChanged.event';
import { WordSetDao } from '../../../infrastructure-interfaces/dao/WordSetDao';
import { EntityNotFoundById } from '../../../repository-interfaces/errors/EntityNotFoundById';
import { WordSetDto } from '../../../infrastructure-interfaces/dao/dto/WordSetDto';
import { WordDto } from '../../../infrastructure-interfaces/dao/dto/WordDto';

export class WordSetWasChangedEventHandler implements EventHandler<WordSetWasChangedEvent> {
  constructor(private readonly wordSetDao: WordSetDao) {}

  async handle(event: WordSetWasChangedEvent): Promise<void> {
    const wordSetDto = (await this.wordSetDao.findById(event.wordSet.id.value)).orThrow(
      new EntityNotFoundById('WordSet', event.wordSet.id),
    );

    await this.wordSetDao.save(
      new WordSetDto(wordSetDto.id, event.wordSet.words.map(WordDto.convertFromEntity), event.wordSet.cloneCount),
    );
  }
}
