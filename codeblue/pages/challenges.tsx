import {
  Flex,
  Icon,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { parseCookies } from "nookies";
import React from "react";
import { GoPlay } from "react-icons/go";

import { Layout } from "../components/Layout";
import { useGetChallenges } from "../hooks/useChallenges";
import { ApplicationPaths } from "../types";
import { TOKEN_KEY } from "../utils/authenticated";

const Challenges = () => {
  const { [TOKEN_KEY]: token } = parseCookies(null);
  const { data, isLoading, isSuccess } = useGetChallenges(token);
  const router = useRouter();

  return (
    <Layout title="desafios" currentPath="challenges">
      <Flex mt="6" w="100%" minH="100vh" alignItems="center">
        <Table variant="striped" w="100%" type={["sm", "sm", "lg"]}>
          <Thead>
            <Th
              display={["none", "none", "revert"]}
              fontFamily="JetBrains Mono"
              fontSize="md"
              color="brand.800"
            >
              Desafio
            </Th>
            <Th
              textAlign="center"
              fontFamily="JetBrains Mono"
              fontSize={["sm", "sm", "md"]}
              color="brand.800"
            >
              Descrição
            </Th>
            <Th
              display={["none", "none", "revert"]}
              textAlign="center"
              fontFamily="JetBrains Mono"
              fontSize="md"
              color="brand.800"
            >
              Pontuação
            </Th>
            <Th
              textAlign="center"
              fontFamily="JetBrains Mono"
              fontSize={["sm", "sm", "md"]}
              color="brand.800"
            >
              Acessar Desafio
            </Th>
          </Thead>
          <Tbody bgColor="brand.400">
            {isLoading ? (
              <Spinner />
            ) : (
              isSuccess &&
              data?.map((challenge) => (
                <Tr key={challenge.id} color="gray.50">
                  <Td
                    display={["none", "none", "revert"]}
                  >{`Desafio ${challenge.id}`}</Td>
                  <Td
                    fontSize={["sm", "sm", "md"]}
                    textAlign="center"
                  >{`${challenge.descricao.slice(0, 30)}...`}</Td>
                  <Td display={["none", "none", "revert"]} textAlign="center">
                    {challenge.pontosPremiacao}
                  </Td>
                  <Td textAlign="center">
                    <IconButton
                      aria-label="abrir desafio"
                      bg="brand.800"
                      _hover={{
                        bg: "brand.300",
                      }}
                      icon={<Icon as={GoPlay} color="gray.100" />}
                      onClick={() =>
                        router.push({
                          pathname: ApplicationPaths.CHALLENGE,
                          query: { id: challenge.id },
                        })
                      }
                    />
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Flex>
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
    props: { token: token },
  };
};

export default Challenges;
