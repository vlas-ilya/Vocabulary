import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { WordSetWasClonedEvent } from '../../../domain/other/word/events/WordSetWasCloned.event';
import { WordSetDao } from '../../../infrastructure-interfaces/dao/WordSetDao';
import { WordSetDto } from '../../../infrastructure-interfaces/dao/dto/WordSetDto';

export class WordSetWasClonedEventHandler implements EventHandler<WordSetWasClonedEvent> {
  private readonly wordDao: WordSetDao;

  constructor(wordDao: WordSetDao) {
    this.wordDao = wordDao;
  }

  async handle(event: WordSetWasClonedEvent): Promise<void> {
    const wordSetDto = WordSetDto.convertFromEntity(event.wordSet);
    wordSetDto.cloneCount++;
    await this.wordDao.save(wordSetDto);
  }
}
