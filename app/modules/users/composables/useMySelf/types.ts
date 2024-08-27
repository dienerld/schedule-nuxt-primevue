import type { User } from '@/modules/users/entities/user';

export interface MyselfContextProvider {
  user: Ref<User | null>;
  loading: Ref<boolean>;
  update: () => Promise<void>;
}
