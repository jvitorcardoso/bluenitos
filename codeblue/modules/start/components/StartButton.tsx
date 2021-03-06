import React from "react";

import { Button, Link } from "@chakra-ui/react";

import { ApplicationPaths } from "../../../types";
import { useRouter } from "next/dist/client/router";

interface StartButtonProps {
  type: "login" | "create";
  dataTestId: string;
}

export function StartButton({ type, dataTestId }: StartButtonProps) {
  const router = useRouter();
  return (
    <Button
      w={["auto", "auto", "auto"]}
      id={dataTestId}
      h="12"
      onClick={() =>
        router.push(
          type === "login" ? ApplicationPaths.LOGIN : ApplicationPaths.CREATE
        )
      }
      bgColor={type === "login" ? "brand.400" : "brand.200"}
      color={type === "login" ? "gray.100" : "brand.400"}
      boxShadow={`4px 4px ${type === "login" ? "#7A7CFF" : "#1E1A28"}`}
      _hover={{
        bg: "brand.800",
      }}
    >
      {type === "login" ? "fazer login" : "criar conta"}
    </Button>
  );
}
