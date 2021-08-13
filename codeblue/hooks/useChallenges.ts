import { AxiosError, AxiosPromise } from "axios";
import { useMutation, useQuery } from "react-query";
import requestAxios from "../utils/requests";
import { UserReturn } from "./useLoggedUser";

export type GetChallengesData = {
  id: number;
  descricao: string;
  resultado: string;
  users: UserReturn[];
  pontosPremiacao: number;
};

/* GET CHALLENGES */

export const GET_CHALLENGES = "getChallenges";

export const getChallenges = async (
  token: string
): Promise<GetChallengesData[]> => {
  const { data } = await requestAxios({
    url: "/api/Exercises",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useGetChallenges = (token: string) => {
  return useQuery([GET_CHALLENGES, token], () => getChallenges(token));
};

/* UPDATE CHALLENGE */

export const UPDATE_CHALLENGE = "updateChallenge";

export type UpdateChallengeData = {
  descricao: string;
  resultado: string;
  pontosPremiacao: number;
  token: string;
};

export const updateChallenge = async (
  info: UpdateChallengeData
): Promise<GetChallengesData> => {
  const { data } = await requestAxios({
    url: `/api/Exercises`,
    method: "PUT",
    data: info,
    headers: {
      Authorization: `Bearer ${info.token}`,
    },
  });
  return data;
};

export const useUpdateChallenge = () => {
  useMutation(updateChallenge);
};

/* GET EXERCISE */

export const GET_CHALLENGE = "getChallenge";

interface GetChallengeInfo {
  challenge_id: number;
  token: string;
}

export const getChallenge = async (
  info: GetChallengeInfo
): Promise<GetChallengesData> => {
  const { data } = await requestAxios({
    url: `/api/Exercises/${info.challenge_id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${info.token}`,
    },
  });
  return data;
};

export const useGetChallenge = (info: GetChallengeInfo) => {
  return useQuery([GET_CHALLENGE, info], () => getChallenge(info));
};

/* SUBMIT CHALLENGE */

export const SUBMIT_CHALLENGE = "submitChallenge";

interface SubmitChallengeInfo {
  challenge_id: number;
  resultado: string;
  token: string;
}

export const submitChallenge = async (
  info: SubmitChallengeInfo
): Promise<string> => {
  const { data } = await requestAxios({
    url: `/api/Exercises/${info.challenge_id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${info.token}`,
      resultado: `${info.resultado}`
    },
  });
  return data;
};

export const useSubmitChallenge = () => {
  return useMutation(submitChallenge)
};

/* CREATE CHALLENGE */

export type CreateChallengeData = UpdateChallengeData;

export const createChallenge = async (
  info: CreateChallengeData
): Promise<GetChallengesData> => {
  const { data } = await requestAxios({
    url: `/api/Exercises`,
    method: "POST",
    data: info,
    headers: {
      Authorization: `Bearer ${info.token}`,
    },
  });
  return data;
};

export const useCreateChallenge = () => {
  useMutation(createChallenge);
};
