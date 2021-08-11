import {
  Flex,
  HStack,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React from "react";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { SessionTitle } from "../components/SessionTitle";
import { useLoggedUser } from "../hooks/useLoggedUser";
import { useGetUsersRank } from "../hooks/useRanking";
import { ApplicationPaths } from "../types";
import { TOKEN_KEY } from "../utils/authenticated";

const Profile = () => {
  const { [TOKEN_KEY]: token } = parseCookies(null);
  const { data } = useLoggedUser(token);
  const ranking = useGetUsersRank({ qtd: 50, token: token });

  const userRanking = ranking.data?.findIndex((user) => user.id === data?.id);

  return (
    <Layout title="perfil" currentPath="profile">
      <VStack w="100%">
        <HStack spacing={6} align="stretch" alignItems="center">
          <VStack>
            <Image
              src={data?.avatar}
              alt={`${data?.nome} ${data?.sobrenome}`}
              w="40"
              h="40"
              textAlign="center"
              color="white"
              bg="brand.800"
              borderRadius="10"
              mt="10"
              objectFit="cover"
              border="2px"
              borderColor="white"
            />

            <Text color="gray.50" fontWeight="600" fontSize="xl">
              {`${data?.nome} ${data?.sobrenome}`}
            </Text>
            <Text fontWeight="600" fontSize="lg" color="gray.50">
              @<Colored>{data?.userName}</Colored>
            </Text>
          </VStack>

          <VStack>
            <Image
              display={["none", "none", "none", "flex"]}
              alt="Moça programando"
              boxSize="380px"
              src="/images/mocacodando.png"
            />
          </VStack>
        </HStack>

        <Flex w="100%" direction="column" alignItems="flex-start">
          <SessionTitle title="conquistas" />

          <VStack
            mt="4"
            w="80%"
            minH="40"
            bg="brand.800"
            borderRadius="10"
            p="8"
            border="3px"
            borderColor="gray.50"
            borderStyle="dashed"
            borderInline="dodgerblue"
            alignSelf="center"
          >
            <HStack w="100%" spacing="auto">
              <Text fontWeight="600" fontSize="xl" color="brand.400" w="100%">
                Pontuação:
              </Text>
              <Stat >
                <StatLabel color="gray.50">points</StatLabel>
                <StatNumber textAlign="right" color="brand.300">{data?.pontuacao}</StatNumber>
              </Stat>
            </HStack>
            <HStack w="100%" spacing="auto">
              <Text fontWeight="600" fontSize="xl" color="brand.400" w="100%">
                Ranking:
              </Text>
              <Stat >
                <StatLabel color="gray.50">position</StatLabel>
                <StatNumber textAlign="right" color="brand.300">{userRanking! + 1}</StatNumber>
              </Stat>
            </HStack>
          </VStack>
        </Flex>
      </VStack>
    </Layout>
  );
};

const Colored = styled.strong`
  color: #c869a9;
`;

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
export default Profile;
