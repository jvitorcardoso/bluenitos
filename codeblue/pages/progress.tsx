import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React from "react";
import { Layout } from "../components/Layout";
import { Text, Box, HStack, Spinner, VStack } from "@chakra-ui/react";
import LanguageProgress from "../components/LanguageProgress";
import ChallengeProgress from "../components/ChallengeProgress";
import { ApplicationPaths } from "../types";
import { TOKEN_KEY } from "../utils/authenticated";
import { useGetChallenges } from "../hooks/useChallenges";
import { SessionTitle } from "../components/SessionTitle";
import { useLoggedUser } from "../hooks/useLoggedUser";

const Progress = () => {
  const { [TOKEN_KEY]: token } = parseCookies(null);
  const meData = useLoggedUser(token)
  const { data, isLoading, isSuccess } = useGetChallenges(token);

  const userChallenges = data?.filter(challenge => meData.data?.exercises?.includes(challenge.id))

  return (
    <Layout title="progresso" currentPath="progress">
      <VStack w="100%" alignItems="flex-start" spacing="8">
        <Text fontSize="xl" mt="8" color="gray.100">
          Exercite sua lógica e expanda suas conexões
        </Text>

        <VStack alignItems="flex-start">
          <SessionTitle title="desafios concluídos" />
          <HStack alignItems="center">
            <Box mt={2} bg="brand.500" borderRadius="10">
              {isLoading ? (
                <Spinner />
              ) : (
                isSuccess &&
                userChallenges?.map((challenge) => (
                  <ChallengeProgress
                    key={challenge.id}
                    challenge={challenge.id}
                    points={challenge.pontosPremiacao}
                  />
                ))
              )}
            </Box>
          </HStack>
        </VStack>

        <VStack w="100%" alignItems="flex-start">
          <SessionTitle title="linguagens" />
          <Box w="100%" p={3} mt={2} borderRadius="10">
            <LanguageProgress language="c#" value={50} />
            <LanguageProgress language="javascript" value={85} />
          </Box>
        </VStack>
      </VStack>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { [TOKEN_KEY]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: ApplicationPaths.START,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Progress;
