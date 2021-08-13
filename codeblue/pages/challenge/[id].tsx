import { Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { parseCookies } from "nookies";
import styled from "styled-components";
import { Layout } from "../../components/Layout";
import { SessionTitle } from "../../components/SessionTitle";
import { useGetChallenge } from "../../hooks/useChallenges";
import { Editor } from "../../modules/challenge/components/Editor";
import { ApplicationPaths } from "../../types";
import { TOKEN_KEY } from "../../utils/authenticated";

const Challenge = () => {
  const { query } = useRouter();
  const { [TOKEN_KEY]: token } = parseCookies(null);
  const { data } = useGetChallenge({
    challenge_id: Number(query["id"]),
    token: token,
  });

  return (
    <Layout title="Challenge">
      <VStack w="100%" alignItems="flex-start">
        <SessionTitle title={`Desafio ${data?.id}`} />
        <Text
          overflow="hidden"
          w="100%"
          p="4"
          border="4px"
          bg="black"
          borderColor="gray.50"
          borderRadius="md"
          borderStyle="ridge"
          color="lime"
        >
          {data?.descricao}
          <Bar> |</Bar>
        </Text>
        <Editor id={Number(query["id"])} token={token} />
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

const Bar = styled.span`
  font-size: 1.5rem;
  animation: blink 1s infinite;
  color: lime;
`;

export default Challenge;
