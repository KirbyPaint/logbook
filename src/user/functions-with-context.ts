import { Context } from '../../context';

// interface CreateUser {
//   name: string;
//   email: string;
//   acceptTermsAndConditions: boolean;
// }

export async function createUser(user, ctx: Context) {
  if (user.acceptTermsAndConditions) {
    return await ctx.prisma.user.create({
      data: user,
    });
  } else {
    return new Error('User must accept terms!');
  }
}
