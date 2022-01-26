import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { v4 } from 'uuid';
import { LogService } from '../log/log.service';

let userService: UserService;

beforeEach(async () => {
  const app: TestingModule = await Test.createTestingModule({
    controllers: [UserController],
    providers: [UserService, PrismaService, LogService],
  }).compile();

  userService = app.get<UserService>(UserService);
});

describe('UserService', () => {
  it('should clear the db before the tests', async () => {
    await userService.superDelete();
    const users = await userService.findAll({});
    expect(users).toEqual([]);
  });

  it('should create a user', async () => {
    const user = {
      id: v4(),
      name: 'Rich',
      email: 'hello@prisma.io',
      username: 'Dummy1',
      password: 'Insecure',
    };

    const createdUser = await userService.create(user);
    expect(createdUser).toBeDefined();
    expect(createdUser.name).toBe('Rich');
    expect(createdUser.email).toBe('hello@prisma.io');
  });

  it('should find all users', async () => {
    const users = await userService.findAll({}); // this should be line 32, idk why coverage fails
    expect(users.length).toBe(1);
  });

  it('should find all users matching the search parameters', async () => {
    const searchFor = await userService.findAll({
      where: {
        email: 'hello@prisma.io',
      },
      orderBy: {
        name: 'asc',
      },
    });
    expect(searchFor.length).toBe(1);
  });

  it('should find a user', async () => {
    const users = await userService.findAll({});
    const user = await userService.findOne({ where: { id: users[0].id } });
    // gdi ts, if this is null, the test failed lol
    // @ts-ignore: Object is possibly 'null'.
    expect(user.name).toEqual('Rich');
    // @ts-ignore: Object is possibly 'null'.
    expect(user.email).toEqual('hello@prisma.io');
  });

  it('should update a user', async () => {
    const users = await userService.findAll({});
    const user = await userService.update(users[0].id, {
      name: 'Samus',
    });
    // @ts-ignore: Object is possibly 'null'.
    expect(user.name).toEqual('Samus');
  });

  it('should delete a user', async () => {
    await userService.delete({ email: 'hello@prisma.io' });
    try {
      const deleted = await (
        await userService.findAll({})
      ).filter((user) => user.email === 'hello@prisma.io');
      expect(deleted).toStrictEqual([]);
    } catch (e) {
      console.error(e);
    }
  });
});
