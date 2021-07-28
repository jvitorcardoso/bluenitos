import { Footer } from "app/components/Footer";
import { Images } from "app/constants";
import React from "react";
import { BsBoxArrowInRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import * as yup from "yup";

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { ApplicationPaths } from "../../../types";
import ImText from "./components/ImageFront";
import { useFormik } from "formik";
import { FormInput } from "app/components/FormInput";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
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
    onSubmit: () => {},
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
          w="100%"
          spacing={8}
          alignItems="center"
          justifyContent="center"
          my="10"
          direction="column"
        >
          <Image src={Images.LOGO} />
          <Text color="white" fontSize="2xl">
            Faça seu cadastro
          </Text>
          <VStack spacing={2} w={["80%", "80%", "80%", "auto"]}>
            <FormControl
              id="Email"
              w="auto"
              isRequired
              isInvalid={!!formik.errors.Email && !!formik.touched.Email}
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
              w="auto"
              isRequired
              isInvalid={
                !!formik.errors.PasswordHash && !!formik.touched.PasswordHash
              }
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
          <Button variant="solid" type="submit" w="40" mt="8">
            Entrar
          </Button>

          <Text
            as={Link}
            to={ApplicationPaths.CREATE}
            fontSize="md"
            color="white"
            _hover={{ color: "brand.200" }}
            mt="8"
          >
            <Icon as={BsBoxArrowInRight} color="brand.800" mr="2" />
            Criar conta
          </Text>
        </Stack>

        <ImText />

        <Footer
          to="https://br.freepik.com/vetores/icone"
          credits="Ícone vetor criado por fullvector - br.freepik.com"
        />
      </Flex>
    </form>
  );
}
