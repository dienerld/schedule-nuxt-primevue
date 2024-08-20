import { useHashPass } from '~~/server/helpers/hash-password';

export async function createUsers() {
  const db = useDB();
  const encrypt = useHashPass();

  const users: {
    apartment: number;
    name: string;
    password: string;
  }[] = [];
  try {
    for (let floor = 1; floor <= 8; floor++) {
      for (let apartment = 1; apartment <= 10; apartment++) {
        const aptNumber = `${floor}${apartment.toString().padStart(2, '0')}`;
        users.push({
          apartment: parseInt(aptNumber),
          name: `User_${aptNumber}`,
          password: encrypt.hash(aptNumber),
        });
      }
    }
    for (const user of users) {
      await db.insert(tables.user).values(user).execute();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
