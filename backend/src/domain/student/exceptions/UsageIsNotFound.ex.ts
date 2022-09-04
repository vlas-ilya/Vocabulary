import { BaseException } from '../../base/BaseException';
import { UsageId } from '../Word.e';

export class UsageIsNotFound extends BaseException {
  private usageId: UsageId;
  constructor(usageId: UsageId) {
    super();
    this.usageId = usageId;
  }
}
