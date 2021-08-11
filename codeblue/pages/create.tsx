import { useFormik } from "formik";
import React, { useContext, useRef } from "react";
import { BsBoxArrowInRight } from "react-icons/bs";
import {
  FaEnvelope,
  FaLock,
  FaRegUser,
  FaUser,
  FaUserAstronaut,
} from "react-icons/fa";

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
import { useRouter } from "next/dist/client/router";
import { useRegister } from "../hooks/useRegister";
import { passwordRegex } from "../utils/functions";
import { ApplicationPaths } from "../types";
import { InputFile } from "../components/FileInput";
import { Errors, Images } from "../constants";
import { FormInput } from "../components/FormInput";
import { InitialImage } from "../components/InitialImage";
import { Footer } from "../components/Footer";
import { GetServerSideProps } from "next";
import { TOKEN_KEY } from "../utils/authenticated";
import { parseCookies } from "nookies";
import { useLogin } from "../hooks/useLogin";
import { AuthContext } from "../context/AuthContext";

const Create = () => {
  const InputRef = useRef<HTMLInputElement>();
  let router = useRouter();
  const { handleSetToken } = useContext(AuthContext);

  const { mutate } = useRegister();
  const login = useLogin()

  type formikType = {
    Avatar: string;
    Nome: string;
    Sobrenome: string;
    Username: string;
    Email: string;
    PasswordHash: string;
  };

  const formik = useFormik<formikType>({
    initialValues: {
      Avatar: "",
      Nome: "",
      Sobrenome: "",
      Username: "",
      Email: "",
      PasswordHash: "",
    },
    validationSchema: yup.object().shape({
      Avatar: yup.string(),
      Nome: yup
        .string()
        .min(2, "Nome muito curto")
        .max(12, "Nome muito longo")
        .required("Nome é obrigatório"),
      Sobrenome: yup
        .string()
        .min(2, "Sobrenome muito curto")
        .max(12, "Sobrenome muito longo")
        .required("Sobrenome é obrigatório"),
      Username: yup
        .string()
        .min(2, "O número mínimo de caracteres é 2")
        .max(20, "O número máximo de caracteres é 20")
        .required("Username é obrigatório"),
      Email: yup
        .string()
        .email("Email inválido!")
        .required("Email é obrigatório"),
      PasswordHash: yup
        .string()
        .test(
          "password-strong",
          "A senha precisa ter 8 dígitos, letras maiúsculas e minúsculas e um caractere especial, verifique abaixo",
          (value) => passwordRegex.test(value!)
        )
        .required("Senha é obrigatória"),
    }),
    onSubmit: (values) => {
      mutate(
        {
          Email: values.Email,
          Nome: values.Nome,
          Sobrenome: values.Sobrenome,
          PasswordHash: values.PasswordHash,
          Username: values.Username,
          Avatar: values.Avatar,
        },
        {
          onSuccess:  () => {
             login.mutate({Email: values.Email, PasswordHash: values.PasswordHash}, {
              onSuccess: (data) => {
                handleSetToken(data)
                router.push(ApplicationPaths.HOME);
              }
            })
          },
          onError: () => {
            formik.setFieldError("Nome", Errors.CREATEERROR)
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
        <Image
          w="20"
          src={Images.LOGO}
          position={["initial", "initial", "initial", "absolute"]}
          left="8"
          top="8"
          alt="codeblue logo"
        />

        <Stack
          w="100%"
          spacing={[0, 0, 8]}
          alignItems={["center", "center", "center", "flex-start"]}
          justifyContent="center"
          my="10"
          direction={["column", "column", "column", "row"]}
        >
          <FormControl
            w="auto"
            id="Avatar"
            isInvalid={!!formik.touched.Avatar && !!formik.errors.Avatar}
          >
            <VStack
              w="auto"
              spacing={6}
              mb="4"
              mx="4"
              mt="10"
              alignItems="center"
            >
              <Image
                fallbackSrc="https://via.placeholder.com/150/1E1A28"
                src={formik.values.Avatar}
                alt="avatar"
                w="36"
                h="36"
                objectFit="cover"
                borderRadius="md"
              />
              <Button onClick={() => InputRef.current?.click()}>
                Escolher foto
              </Button>
              <InputFile
                onChange={formik.handleChange("Avatar")}
                onError={(error) => formik.setFieldError("Avatar", error)}
                ref={InputRef}
              />
              <FormErrorMessage w="auto">
                {formik.errors.Avatar}
              </FormErrorMessage>
            </VStack>
          </FormControl>
          <VStack
            w={["100%", "100%", "auto", "80"]}
            spacing={4}
            alignItems="center"
          >
            <Text color="white" fontSize="xl">
              Faça seu cadastro
            </Text>
            <VStack spacing={2} w={["80%", "80%", "80%", "100%"]}>
              <FormControl
                id="Nome"
                isRequired
                isInvalid={!!formik.errors.Nome}
              >
                <FormErrorMessage w="auto">
                  {formik.errors.Nome}
                </FormErrorMessage>
                <FormInput
                  icon={FaUser}
                  onChange={formik.handleChange("Nome")}
                  placeholder="Nome"
                  type="text"
                />
              </FormControl>
              <FormControl
                id="Sobrenome"
                isRequired
                isInvalid={
                  !!formik.errors.Sobrenome
                }
              >
                <FormErrorMessage>{formik.errors.Sobrenome}</FormErrorMessage>
                <FormInput
                  icon={FaRegUser}
                  onChange={formik.handleChange("Sobrenome")}
                  placeholder="Sobrenome"
                  type="text"
                />
              </FormControl>
              <FormControl
                id="Username"
                isRequired
                isInvalid={
                  !!formik.errors.Username
                }
              >
                <FormErrorMessage>{formik.errors.Username}</FormErrorMessage>
                <FormInput
                  icon={FaUserAstronaut}
                  onChange={formik.handleChange("Username")}
                  placeholder="Username"
                  type="text"
                />
              </FormControl>
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
                isInvalid={
                  !!formik.errors.PasswordHash
                }
              >
                <FormErrorMessage>
                  {formik.errors.PasswordHash}
                </FormErrorMessage>
                <FormInput
                  icon={FaLock}
                  onChange={formik.handleChange("PasswordHash")}
                  placeholder="Senha"
                  type="password"
                />
              </FormControl>
            </VStack>
            <Button
              _hover={{
                color: "white",
                bgColor: "brand.800",
              }}
              type="submit"
              w="80%"
              mt="8"
            >
              Criar conta
            </Button>

            <Text
              as={Link}
              onClick={() => router.push(ApplicationPaths.LOGIN)}
              fontSize="md"
              color="white"
              _hover={{ color: "brand.200" }}
              mt="8"
            >
              <Icon as={BsBoxArrowInRight} color="brand.800" mr="2" />
              Entrar com a minha conta
            </Text>
          </VStack>
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

export default Create;
