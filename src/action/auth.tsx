import { useEffect, useState } from 'react';
import { getAllUsers } from '../data/api';

type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  name: string;
  address: string;
  phone: string;
};
type UserLoginForm = {
  email: string;
  password: string;
};
export function CheckLogin(userlogin: UserLoginForm) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data as User[]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const isUser = users.findIndex(
    (user) => user.email === userlogin.email && user.password === userlogin.password,
  );
  const CheckAuth = isUser !== -1 ? true : false;
  return CheckAuth;
}
