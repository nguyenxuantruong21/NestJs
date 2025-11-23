import { Connection } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreatePets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().createMany(10);
  }
}
