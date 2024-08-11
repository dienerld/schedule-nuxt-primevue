import crypto from 'crypto';

export function useHashPass() {
  const { hash } = useRuntimeConfig();
  const saltHex = hash.salt.toString(16);
  function hashPassword(password: string) {
    const hash = crypto
      .pbkdf2Sync(password, saltHex, 1000, 64, `sha512`)
      .toString(`hex`);
    return hash;
  }

  // Função para verificar se uma senha corresponde ao hash
  function comparePassword(password: string, hash: string) {
    const hashedPassword = crypto
      .pbkdf2Sync(password, saltHex, 1000, 64, `sha512`)
      .toString(`hex`);
    return hash === hashedPassword;
  }

  return { hash: hashPassword, compare: comparePassword };
}
