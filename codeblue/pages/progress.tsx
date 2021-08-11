import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React from "react";
import { Layout } from "../components/Layout";
import { Text, Box, HStack, Spinner } from "@chakra-ui/react";
import LanguageProgress from "../components/LanguageProgress";
import ChallengeProgress from "../components/ChallengeProgress";
import { ApplicationPaths } from "../types";
import { TOKEN_KEY } from "../utils/authenticated";
import { useGetChallenges } from "../hooks/useChallenges";

const Progress = () => {
  const { [TOKEN_KEY]: token } = parseCookies(null);
  const { data, isLoading, isSuccess } = useGetChallenges(token);

  const slicedArray = data?.slice(0, 3);

  return (
    <Layout title="progresso" currentPath="progress">
      <Text mt="0.3" color="gray.100">
        Exercite sua lógica e expanda suas conexões
      </Text>

      <Text color="gray.50" mt={10} fontSize="24">
        por concluidos
      </Text>
      <HStack alignItems="center">
        <Box mt={2} bg="brand.500" borderRadius="10">
          {isLoading ? (
            <Spinner />
          ) : (
            isSuccess &&
            slicedArray?.map((challenge) => (
              <ChallengeProgress
                key={challenge.id}
                challenge={challenge.id}
                points={challenge.pontosPremiacao}
              />
            ))
          )}
        </Box>
      </HStack>

      <Text color="gray.50" mt={8} fontSize="24">
        por linguagens
      </Text>
      <Box p={3} mt={2} borderRadius="10">
        <LanguageProgress language="c#" value={50} />
        <LanguageProgress language="javascript" value={85} />
      </Box>
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
