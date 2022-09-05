import { EventHandler } from '../../../infrastructure-interfaces/events/handlers/EventHandler';
import { WordSetDao } from '../../../infrastructure-interfaces/dao/WordSetDao';
import { WordSetWasCreatedEvent } from '../../../domain/other/word/events/WordSetWasCreated.event';
import { WordSetDto } from '../../../infrastructure-interfaces/dao/dto/WordSetDto';

export class WordSetWasCreatedEventHandler implements EventHandler<WordSetWasCreatedEvent> {
  private readonly wordDao: WordSetDao;

  constructor(wordDao: WordSetDao) {
    this.wordDao = wordDao;
  }

  async handle(event: WordSetWasCreatedEvent): Promise<void> {
    await this.wordDao.save(WordSetDto.convertFromEntity(event.wordSet));
  }
}
