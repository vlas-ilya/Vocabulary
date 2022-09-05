import { UsageId } from '../Usage.entity';
import { Error } from '../../../../utils/Error';

export class UsageIsNotFound extends Error {
  private usageId: UsageId;
  constructor(usageId: UsageId) {
    super();
    this.usageId = usageId;
  }
}
