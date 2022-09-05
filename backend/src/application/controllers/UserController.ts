import { UserProcessor } from '../../processor-interfaces/UserProcessor';

export class UserController {
  constructor(private readonly processor: UserProcessor) {}
}
