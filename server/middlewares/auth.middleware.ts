export const authMiddleware = eventHandler(async (event): Promise<void> => {
  const { user } = await getUserSession(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }
});
