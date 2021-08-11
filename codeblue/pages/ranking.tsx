import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React from "react";
import { Layout } from "../components/Layout";

import {
  VStack,
  Spinner,
} from "@chakra-ui/react";

import { ApplicationPaths } from "../types";
import { TOKEN_KEY } from "../utils/authenticated";
import { useGetUsersRank } from "../hooks/useRanking";
import { UserRank } from "../modules/ranking/components/UserRank";

const Ranking = () => {
  const { [TOKEN_KEY]: token } = parseCookies(null);
  const { data, isLoading, isSuccess } = useGetUsersRank({
    qtd: 10,
    token: token,
  });
  console.log(data);
  return (
    <Layout title="ranking" currentPath="ranking">
      <VStack
        spacing={["6", "6", "12"]}
        align="stretch"
        alignItems="center"
        direction="column"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          isSuccess &&
          data?.map((user, index) => (
            <UserRank
              key={user.id}
              name={`${user.nome} ${user.sobrenome}`}
              avatar={user.avatar}
              place={index + 1}
              points={user.pontuacao}
            />
          ))
        )}
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

export default Ranking;
