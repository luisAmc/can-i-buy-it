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

const SignUpInput = builder.inputType('SignUpInput', {
  fields: (t) => ({
    username: t.string(),
    password: t.string()
  })
});

builder.mutationField('signUp', (t) =>
  t.prismaField({
    type: 'User',
    skipTypeScopes: true,
    authScopes: {
      unauthenticated: true
    },
    args: { input: t.arg({ type: SignUpInput }) },
    resolve: async (query, _root, { input }, { req }) => {
      const user = await db.user.create({
        ...query,
        data: {
          username: input.username,
          hashedPassword: await hashPassword(input.password)
        }
      });

      await createSession(req, user);

      return user;
    }
  })
);
