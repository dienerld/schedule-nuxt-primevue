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

  onMounted(() => {
    loading.value = true;
    const session = useUserSession();

    user.value = session.user.value!;
    loading.value = !session.ready;
  });

  async function update() {
    const session = useUserSession();
    await session.fetch();
    user.value = session.user.value!;
  }

  provide<MyselfContextProvider>(myselfKey, { user, loading, update });

  return {
    user,
    loading,
    update,
  };
}
