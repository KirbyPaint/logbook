import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { uuid as v4 } from 'uuidv4';

let userService: UserService;

beforeEach(async () => {
  const app: TestingModule = await Test.createTestingModule({
    controllers: [UserController],
    providers: [UserService, PrismaService],
  }).compile();

  userService = app.get<UserService>(UserService);
});

describe('UserService', () => {
  it('should create a user', async () => {
    const user = {
      id: v4(),
      name: 'Rich',
      email: 'hello@prisma.io',
      acceptTermsAndConditions: true,
    };

    const createdUser = await userService.create(user);
    console.log(`createdUser`, createdUser);
    expect(createdUser).toBeDefined();
    expect(createdUser.name).toBe('Rich');
    expect(createdUser.email).toBe('hello@prisma.io');
    expect(user.acceptTermsAndConditions).toBe(true);
  });
});

// test('should create new user ', async () => {
//   const user = {
//     id: 1,
//     name: 'Rich',
//     email: 'hello@prisma.io',
//     acceptTermsAndConditions: true,
//   };
//   mockCtx.prisma.user.create.mockResolvedValue(user);

//   await expect(createUser(user, ctx)).resolves.toEqual({
//     id: 1,
//     name: 'Rich',
//     email: 'hello@prisma.io',
//     acceptTermsAndConditions: true,
//   });
// });

// test('should update a users name ', async () => {
//   const user = {
//     id: 1,
//     name: 'Rich Name',
//     email: 'hello@prisma.io',
//     acceptTermsAndConditions: true,
//   };
//   mockCtx.prisma.user.update.mockResolvedValue(user);

//   // update taken out of the context file
//   // await expect(updateUsername(user, ctx)).resolves.toEqual({
//   //   id: 1,
//   //   name: 'Rich Name',
//   //   email: 'hello@prisma.io',
//   //   acceptTermsAndConditions: true,
//   // });
// });

// test('should fail if user does not accept terms', async () => {
//   const user = {
//     id: 1,
//     name: 'Rich Name',
//     email: 'hello@prisma.io',
//     acceptTermsAndConditions: false,
//   };

//   mockCtx.prisma.user.create.mockRejectedValue(
//     new Error('User must accept terms!'),
//   );

//   await expect(createUser(user, ctx)).resolves.toEqual(
//     new Error('User must accept terms!'),
//   );
// });

// test('should delete the user', async () => {
//   const userToDelete = await mockCtx.prisma.user.findUnique({
//     where: { id: 1 },
//   });
//   if (userToDelete) {
//     await mockCtx.prisma.user.delete.mockResolvedValue(userToDelete);
//   }
// });

// test('should not find any more users now', async () => {
//   const allUsers = await mockCtx.prisma.user.findMany();
//   expect(allUsers).toBe(undefined);
// });
