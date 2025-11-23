import { User } from 'src/entities/user.entity';
import { define } from 'typeorm-seeding';
import { Faker } from '@faker-js/faker';

define(User, (faker: typeof Faker) => {
  const user = new User();
  return user;
});
