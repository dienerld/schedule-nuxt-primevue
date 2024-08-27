import { z, zh } from 'h3-zod';
import { useHashPass } from '~~/server/helpers/hash-password';
import { authMiddleware } from '~~/server/middlewares/auth.middleware';

export default eventHandler(async (event) => {
  await authMiddleware(event);
  const { user } = await getUserSession(event)!;
  const db = useDB();
  const body = await zh.useValidatedBody(
    event,
    z
      .object({
        name: z.string().min(3).max(50).optional(),
        password: z
          .string()
          .transform((value) => value || undefined)
          .optional(),
        confirmPassword: z
          .string()
          .transform((value) => value || undefined)
          .optional(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: 'Senhas não conferem',
        path: ['confirmPassword'],
      }),
  );

  if (body.password) {
    body.password = useHashPass().hash(body.password);
  }

  await db
    .update(tables.user)
    .set({
      name: body.name,
      password: body.password,
    })
    .where(eq(tables.user.id, user!.id));

  await setUserSession(event, {
    user: {
      apartment: user!.apartment,
      id: user!.id,
      name: body.name || user!.name,
    },
  });
});
