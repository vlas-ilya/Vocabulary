import { Error } from '../../../../utils/Error';
import { AntonymId } from '../Antonym.entity';

export class AntonymIsNotFoundError extends Error {
  private antonymId: AntonymId;

  constructor(antonymId: AntonymId) {
    super();
    this.antonymId = antonymId;
  }
}
