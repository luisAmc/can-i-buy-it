import { CATEGORY } from '@prisma/client';
import { authenticateUser, hashPassword } from 'src/utils/auth';
import { db } from 'src/utils/prisma';
import { createSession } from 'src/utils/sessions';
import { builder } from '../builder';

const LoginInput = builder.inputType('LoginInput', {
  fields: (t) => ({
    username: t.string(),
    password: t.string()
  })
});

builder.mutationField('login', (t) =>
  t.prismaField({
    type: 'User',
    skipTypeScopes: true,
    authScopes: {
      unauthenticated: true
    },
    args: { input: t.arg({ type: LoginInput }) },
    resolve: async (_query, _root, { input }, { req }) => {
      const user = await authenticateUser(input.username, input.password);

      await createSession(req, user);

      return user;
    }
  })
);

const SignupInput = builder.inputType('SignupInput', {
  fields: (t) => ({
    username: t.string(),
    password: t.string()
  })
});

builder.mutationField('signup', (t) =>
  t.prismaField({
    type: 'User',
    skipTypeScopes: true,
    authScopes: {
      unauthenticated: true
    },
    args: { input: t.arg({ type: SignupInput }) },
    resolve: async (query, _root, { input }, { req }) => {
      const user = await db.user.create({
        ...query,
        data: {
          username: input.username,
          hashedPassword: await hashPassword(input.password),
          budgets: {
            create: [
              {
                category: CATEGORY.CAR,
                limit: 0
              },
              {
                category: CATEGORY.ENTERTAINMENT,
                limit: 0
              },
              {
                category: CATEGORY.FOOD,
                limit: 0
              },
              {
                category: CATEGORY.HOME,
                limit: 0
              },
              {
                category: CATEGORY.SERVICE,
                limit: 0
              },
              {
                category: CATEGORY.OTHER,
                limit: 0
              }
            ]
          }
        }
      });

      await createSession(req, user);

      return user;
    }
  })
);
