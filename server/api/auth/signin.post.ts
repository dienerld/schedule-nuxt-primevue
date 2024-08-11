import { useHashPass } from '~~/server/helpers/hash-password';

export default eventHandler(async (event) => {
  const encrypt = useHashPass();
  const body = await readBody(event);
  const { number, password } = body;

  const user = await useDB()
    .select()
    .from(tables.user)
    .where(eq(tables.user.apartment, number))
    .get();

  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'Apartment not found',
    });
  }

  if (encrypt.compare(password, user.password) === false) {
    throw createError({
      statusCode: 401,
      message: 'Invalid password',
    });
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      apartment: user.apartment,
      name: user.name,
    },
  });

  return {
    success: true,
  };
});
