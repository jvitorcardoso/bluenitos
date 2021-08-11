import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { parseCookies } from "nookies";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

import { Button, Flex, Icon, Spinner, Stack, VStack } from "@chakra-ui/react";

import { Language } from "../components/Language";
import { Layout } from "../components/Layout";
import { MainRanking } from "../components/MainRanking";
import { SessionTitle } from "../components/SessionTitle";
import SingleChallenge from "../components/SingleChallenge";
import SingleProgress from "../components/SingleProgress";
import { ApplicationPaths } from "../types";
import { TOKEN_KEY } from "../utils/authenticated";
import { useGetChallenges } from "../hooks/useChallenges";
import { useGetUsersRank } from "../hooks/useRanking";
import { useLoggedUser } from "../hooks/useLoggedUser";

const langugages = [
  {
    name: "javascript",
    src: "images/js-square.svg",
    description:
      "JavaScript é uma linguagem de programação interpretada estruturada, de script em alto nível com tipagem dinâmica fraca e multiparadigma. Juntamente com HTML e CSS, o JavaScript é uma das três principais tecnologias da World Wide Web",
  },
  {
    name: "python",
    src: "/images/py.svg",
    description:
      "Python é uma linguagem de programação de alto nível, interpretada de script, imperativa, orientada a objetos, funcional, de tipagem dinâmica e forte. Foi lançada por Guido van Rossum em 1991.",
  },
  {
    name: "c-sharp",
    src: "/images/c-sharp.svg",
    description:
      "C# é uma linguagem de programação, multiparadigma, de tipagem forte, desenvolvida pela Microsoft como parte da plataforma .NET. A sua sintaxe orientada a objetos foi baseada no C++ mas inclui muitas influências de outras linguagens de programação, como Object Pascal e, principalmente, Java.",
  },
  
];

const Home = () => {
  const { [TOKEN_KEY]: token } = parseCookies(null);
  const challenges = useGetChallenges(token);
  const ranking = useGetUsersRank({ qtd: 4, token: token });
  const user = useLoggedUser(token);

  const slicedArray = challenges.data?.slice(0, 4);
  const userChallenges = user.data?.exercises?.slice(0, 4);

  const router = useRouter();

  return (
    <Layout title="home" currentPath="home">
      <VStack spacing={12} alignItems="flex-start" w="100%" mt="4">
        <VStack spacing={2} alignItems="flex-start" w="100%">
          <>
            <SessionTitle title="linguagens" />
            <Stack
              w="100%"
              px={3}
              spacing={10}
              direction={["column", "column", "column", "row"]}
            >
              {langugages.map((language, index) => (
                <Language
                  key={index}
                  name={language.name}
                  src={language.src}
                  description={language.description}
                />
              ))}
            </Stack>
          </>
        </VStack>

        <VStack w="100%" spacing={2} alignItems="flex-start">
          <>
            <SessionTitle title="principais desafios" />
            <Stack
              mx="auto"
              spacing={6}
              w="100%"
              alignItems="center"
              direction={["column", "column", "column", "row"]}
            >
              {challenges.isLoading ? (
                <Spinner />
              ) : (
                challenges.isSuccess &&
                slicedArray?.map((challenge) => (
                  <SingleChallenge
                    key={challenge.id}
                    id={challenge.id}
                    description={challenge.descricao}
                    title={`desafio ${challenge.id}`}
                  />
                ))
              )}
            </Stack>
          </>
        </VStack>

        <Stack
          px={["4", "20"]}
          alignItems="flex-start"
          w="100%"
          direction={["column", "column", "column", "row"]}
        >
          <VStack alignItems="flex-start" w="100%">
            <SessionTitle title="ranking geral" />

            <Flex
              w={["100%", "100%", "100%", "96"]}
              minH="xs"
              direction="column"
              bg="brand.200"
              rounded="lg"
              p={4}
            >
              {ranking.isLoading ? (
                <Spinner />
              ) : (
                ranking.isSuccess &&
                ranking.data?.map((user, index) => (
                  <MainRanking
                    key={user.id}
                    avatar={user.avatar}
                    name={`${user.nome} ${user.sobrenome}`}
                    points={user.pontuacao}
                    classification={index + 1}
                  />
                ))
              )}

              <Button
                w="min"
                color="brand.400"
                _hover={{
                  color: "white",
                  bgColor: "brand.800",
                }}
                mt="auto"
                alignSelf="flex-end"
                onClick={() => router.push(ApplicationPaths.RANKING)}
                rightIcon={
                  <Icon as={BsArrowRight} color="brand.400" fontSize="20" />
                }
              >
                Veja mais
              </Button>
            </Flex>
          </VStack>

          <VStack alignItems="flex-start" w="100%">
            <SessionTitle title="meu progresso" />

            <Flex
              w={["100%", "100%", "100%", "96"]}
              minH="xs"
              direction="column"
              bg="brand.200"
              rounded="lg"
              p={4}
            >
              {userChallenges?.map((challenge) => (
                <SingleProgress key={challenge} id={challenge} />
              ))}

              <Button
                w="min"
                color="brand.400"
                _hover={{
                  color: "white",
                  bgColor: "brand.800",
                }}
                mt="auto"
                alignSelf="flex-end"
                onClick={() => router.push(ApplicationPaths.PROGRESS)}
                rightIcon={
                  <Icon as={BsArrowRight} color="brand.400" fontSize="20" />
                }
              >
                Veja mais
              </Button>
            </Flex>
          </VStack>
        </Stack>
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
    props: { token },
  };
};

export default Home;
