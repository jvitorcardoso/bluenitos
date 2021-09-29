import { Box, Button, Stack, useToast, VStack } from "@chakra-ui/react";
import MonacoEditor from "@monaco-editor/react";
import { useState } from "react";

import { useSubmitChallenge } from "../../../hooks/useChallenges";

const files = {
  "script.js": {
    name: "JavaScript",
    language: "javascript",
    value: `/*
    Construa o seu código 
    Mostre o resultado no container acima
    O id do container é 'editor_container'
    Uma dica: utilize manipulação de dom!
    Caso você considere que o valor está correto
    Clique em enviar para submeter o desafio
    
    Bom desafio!
  */
  
  document.getElementById('editor_container').innerHTML=''`,
  },
};

interface EditorProps {
  id: number;
  token: string;
}

export function Editor({ id, token }: EditorProps) {
  const [content, setContent] = useState<string>();
  const { mutate } = useSubmitChallenge();

  const toast = useToast();

  function handleChangeContent(value: string | undefined) {
    setContent(value);
  }

  function onExecute() {
    eval(content!);
  }

  function onSubmit() {
    mutate(
      {
        challenge_id: id,
        resultado: document.getElementById("editor_container")?.firstChild
          ?.textContent!,
        token: token,
      },
      {
        onSuccess: (data) => {
          toast({
            title: "Desafio enviado!",
            description: String(data),
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        },
        onError: () => {
          toast({
            title: "Que pena!",
            description: "Você errou o desafio!",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        },
      }
    );
  }

  return (
    <VStack w="100%" m="6">
      <Stack direction="column" w="100%">
        <Box
          p="4"
          w="100%"
          h="32"
          bg="black"
          color="lime"
          id="editor_container"
        ></Box>
        <VStack w="100%">
          <MonacoEditor
            width="100%"
            height="60vh"
            path={files["script.js"].name}
            defaultLanguage={files["script.js"].language}
            defaultValue={files["script.js"].value}
            onChange={handleChangeContent}
            theme="vs-dark"
          />
          <Button _hover={{ bg: "brand.800" }} onClick={onExecute}>
            Executar
          </Button>
        </VStack>
      </Stack>
      <Button _hover={{ bg: "brand.800" }} onClick={onSubmit}>
        Enviar
      </Button>
    </VStack>
  );
}
