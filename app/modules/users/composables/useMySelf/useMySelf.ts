import type { User } from '../../entities/user';
import type { MyselfContextProvider } from './types';

export const myselfKey = Symbol(
  'myself',
) as InjectionKey<MyselfContextProvider>;

export function useMySelf() {
  const user = ref<User | null>({
    id: 0,
    apartment: 0,
    name: '',
  });
  const loading = ref(true);
  provide<MyselfContextProvider>(myselfKey, { user, loading });

  onMounted(() => {
    loading.value = true;
    const session = useUserSession();

    user.value = session.user.value!;
    loading.value = !session.ready;
  });

  return {
    user,
    loading,
  };
}
