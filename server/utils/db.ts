import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../database/schema';
import { createClient } from '@libsql/client';

export {
  sql,
  eq,
  and,
  or,
  gte,
  lte,
  count,
  between,
  notBetween,
  isNull,
} from 'drizzle-orm';
export const tables = schema;
export type { Machine, Schedule, User } from '../database/schema';

export function useDB() {
  const { turso } = useRuntimeConfig();

  const clientTurso = createClient({
    url: turso.url,
    authToken: turso.authToken,
  });

  return drizzle(clientTurso, { schema });
}
