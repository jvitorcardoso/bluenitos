import { useQuery } from "react-query";
import requestAxios from "../utils/requests";

export type UserReturn = {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  nome: string;
  sobrenome: string;
  pontuacao: number;
  avatar: string;
  exercises: number[];
};

export const GET_USER_DATA = "getLoggedUser";

export const getLoggedUser = async (token: string): Promise<UserReturn> => {
  const { data } = await requestAxios({
    url: `/api/Auth/LoggedUser`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useLoggedUser = (token: string) => {
  return useQuery([GET_USER_DATA, token], () => getLoggedUser(token));
};
