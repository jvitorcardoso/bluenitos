import { Flex, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";

import { Footer } from "../components/Footer";
import { Images } from "../constants";
import { StartButton } from "../modules/start/components/StartButton";
import { TOKEN_KEY } from "../utils/authenticated";
import { ApplicationPaths } from "../types";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

const start = () => {
  return (
    <Flex
      w="100%"
      minH="100vh"
      bgColor="brand.300"
      flexDirection={["column", "row"]}
      alignItems={["center", "flex-start"]}
    >
      <Flex w="100%" h="10" bg="brand.400" display={["flex", "none"]} />
      <VStack
        alignItems={["center", "flex-start"]}
        spacing={["8", "8"]}
        my="8"
        px={["6", "12"]}
      >
        <Image
          pl={["none", "none", "none", "10"]}
          w={["36", "36", "48"]}
          src={Images.LOGO}
          alt="logo"
        />
        <HStack spacing={["4", "4", "8"]}>
          <Image
            w={["12", "20", "16"]}
            src={Images.JAVASCRIPT}
            alt="javascript"
          />
          <Image w={["12", "20", "16"]} src={Images.CSHARP} alt="c-sharp" />
          <Image w={["12", "20", "16"]} src={Images.PYTHON} alt="python" />
        </HStack>
        <Text
          fontSize={["xl", "3xl"]}
          px={["8", "0"]}
          lineHeight="tall"
          w="auto"
          textAlign={["center", "left"]}
          color="gray.100"
        >
          teste e desenvolva seus <br /> conhecimentos e habilidades com as
          <br />
          linguagens de programação do momento
        </Text>
        <Stack
          w="100%"
          spacing="8"
          alignSelf="center"
          direction={["column", "column", "row"]}
        >
          <StartButton dataTestId="to-login-button" type="login" />
          <StartButton dataTestId="to-create-button" type="create" />
        </Stack>
      </VStack>
      <Image src={Images.STARTCOVER} alt="start cover" />
      <Footer
        path="https://storyset.com/web"
        credits="Web illustrations by Storyset"
      />
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { [TOKEN_KEY]: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: ApplicationPaths.HOME,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default start;
