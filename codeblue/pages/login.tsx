import { useFormik } from "formik";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { BsBoxArrowInRight } from "react-icons/bs";
import { FaEnvelope, FaLock } from "react-icons/fa";
import * as yup from "yup";

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Footer } from "../components/Footer";
import { FormInput } from "../components/FormInput";
import { InitialImage } from "../components/InitialImage";
import { Images } from "../constants";
import { AuthContext } from "../context/AuthContext";
import { useLogin } from "../hooks/useLogin";
import { ApplicationPaths } from "../types";
import { useContext } from "react";
import { TOKEN_KEY } from "../utils/authenticated";
import { parseCookies } from "nookies";

const Login = () => {
  const { mutate, isLoading } = useLogin();
  const { handleSetToken } = useContext(AuthContext);
  let router = useRouter();

  type formikType = {
    Email: string;
    PasswordHash: string;
  };

  const formik = useFormik<formikType>({
    initialValues: {
      Email: "",
      PasswordHash: "",
    },
    validationSchema: yup.object().shape({
      Avatar: yup.string(),
      Email: yup
        .string()
        .email("Email inválido!")
        .required("Email é obrigatório"),
      PasswordHash: yup.string().required("Senha é obrigatória"),
    }),
    onSubmit: (values) => {
      mutate(
        { Email: values.Email, PasswordHash: values.PasswordHash },
        {
          onSuccess: (data) => {
            handleSetToken(data);
            router.push(ApplicationPaths.HOME);
          },
          onError: (err) => {
            formik.setFieldError("Email", String(err));
          },
        }
      );
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
    >
      <Flex
        w="100%"
        minH="100vh"
        bg="brand.300"
        py={["20", "20", "20", "0"]}
        wrap={["wrap", "wrap", "wrap", "nowrap"]}
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Flex
          w="100%"
          h="10"
          top="0"
          left="0"
          bg="brand.400"
          mb="4"
          position="absolute"
          display={["flex", "none"]}
        />

        <Stack
          w="80%"
          spacing={4}
          alignItems="center"
          justifyContent="center"
          my="10"
          direction="column"
        >
          <Image src={Images.LOGO} alt="codeblue logo" />
          <Text color="white" fontSize="xl">
            Pratique, aprenda e desafie
          </Text>
          <VStack spacing={2} w={["80%", "80%", "80%", "80"]}>
            <FormControl
              id="Email"
              isRequired
              isInvalid={!!formik.errors.Email}
            >
              <FormErrorMessage>{formik.errors.Email}</FormErrorMessage>
              <FormInput
                icon={FaEnvelope}
                onChange={formik.handleChange("Email")}
                placeholder="Email"
                type="email"
              />
            </FormControl>
            <FormControl
              id="PasswordHash"
              isRequired
              isInvalid={!!formik.errors.PasswordHash}
            >
              <FormErrorMessage>{formik.errors.PasswordHash}</FormErrorMessage>
              <FormInput
                icon={FaLock}
                onChange={formik.handleChange("PasswordHash")}
                placeholder="Senha"
                type="password"
              />
            </FormControl>
          </VStack>
          <Button
            isLoading={isLoading}
            w="80"
            _hover={{
              color: "white",
              bgColor: "brand.800",
            }}
            type="submit"
            mt="6"
          >
            Entrar
          </Button>

          <Text
            as={Link}
            onClick={() => router.push(ApplicationPaths.CREATE)}
            fontSize="md"
            color="white"
            _hover={{ color: "brand.200" }}
            mt="2"
          >
            <Icon as={BsBoxArrowInRight} color="brand.800" mr="2" />
            Criar conta
          </Text>
        </Stack>
        <InitialImage />
        <Footer
          path="https://br.freepik.com/vetores/icone"
          credits="Ícone vetor criado por fullvector - br.freepik.com"
        />
      </Flex>
    </form>
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

export default Login;
