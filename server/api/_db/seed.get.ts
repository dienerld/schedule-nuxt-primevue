import { z } from 'zod';
import { zh } from 'h3-zod';
import { createUsers } from '~~/server/database/seed/users';
export default eventHandler(async (event) => {
  const { hash } = useRuntimeConfig();
  const { key } = await zh.useValidatedQuery(
    event,
    z.object({
      key: z.string(),
    }),
  );

  if (key !== hash.seed) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  await createUsers();
});
