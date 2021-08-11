import React from "react";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { HiCheckCircle } from "react-icons/hi";
import { useGetChallenge } from "../hooks/useChallenges";
import { parseCookies } from "nookies";
import { TOKEN_KEY } from "../utils/authenticated";

interface SingleProgressProps {
  id: number;
}

export default function SingleProgress({ id }: SingleProgressProps) {
  const { [TOKEN_KEY]: token } = parseCookies(null);
  const { data } = useGetChallenge({ challenge_id: id, token: token });

  return (
    <>
      <HStack p={2} m={3} spacing={4}>
        <Icon as={HiCheckCircle} color="success" fontSize="xl" />
        <Text color="brand.400" fontWeight="600">
          {data?.descricao.slice(0, 10) + "..."}
        </Text>
        <Text color="brand.400">{data?.pontosPremiacao}</Text>
      </HStack>
    </>
  );
}
