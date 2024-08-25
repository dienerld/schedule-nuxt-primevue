export function useSession() {
  const { clear, loggedIn, fetch } = useUserSession();

  async function getSession() {
    await fetch();
  }

  async function logout() {
    await clear();
  }
  return {
    loggedIn,
    getSession,
    logout,
  };
}
