import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../database/schema';
import { turso } from '../database/turso';

export { sql, eq, and, or } from 'drizzle-orm';

export const tables = schema;
export function useDB() {
  return drizzle(turso, { schema });
}
