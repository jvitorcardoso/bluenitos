import Head from "next/head";
import React, { ReactNode } from "react";

import { Button, Flex, Heading, HStack, Icon } from "@chakra-ui/react";

import { ApplicationPaths, Paths } from "../types";
import { SideNav } from "./SideNav";
import { ImExit } from "react-icons/im";
import { useRouter } from "next/dist/client/router";
import { useQueryClient } from "react-query";
import { handleLogout } from "../utils/authenticated";

interface LayoutProps {
  title: string;
  currentPath?: Paths;
  children: ReactNode;
}

export function Layout({ title, currentPath, children }: LayoutProps) {
  const router = useRouter();
  const queryClient = useQueryClient()

  function onLogout() {
    handleLogout()
    queryClient.clear();
    router.push(ApplicationPaths.LOGIN)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Flex w="100%" minH={[0, 0, "100vh"]} bg="brand.300">
        <SideNav currentPath={currentPath!} />
        <Flex p="8" w="85%" h="100%" flexDirection="column">
          <HStack w="100%" justifyContent="space-between" alignItems="center">
            <Heading
              fontFamily="Roboto Mono"
              color="brand.800"
              textShadow="4px 4px #1E1A28"
            >
              _{title}
            </Heading>
            <Button
              textShadow="3px 3px #1E1A28"
              bg="transparent"
              color="brand.800"
              _hover={{ color: "brand.200" }}
              fontSize="xl"
              onClick={onLogout}
              leftIcon={<Icon as={ImExit} color="gray.100" />}
            >
              sair
            </Button>
          </HStack>
          {children}
        </Flex>
      </Flex>
    </>
  );
}
