import { Error } from '../../../../utils/Error';
import { SynonymId } from '../Synonym.entity';

export class SynonymIsNotFoundError extends Error {
  private synonymId: SynonymId;

  constructor(synonymId: SynonymId) {
    super();
    this.synonymId = synonymId;
  }
}
