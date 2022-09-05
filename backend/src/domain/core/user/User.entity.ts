import { Entity } from '../../other/base/Entity';
import { Id } from '../../other/base/Id';

export class User extends Entity<UserId> {}

export class UserId extends Id {}
