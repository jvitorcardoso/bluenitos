import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import MonacoEditor from "@monaco-editor/react";
import { useState } from "react";
import { languages } from "../../../types";
import { languagesArray } from "../../../constants";

interface EditorProps {
  onChange: (value: string) => void;
}

export function Editor({ onChange }: EditorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<languages>(
    "JavaScript"
  );

  function handleChangeLanguage(newLanguage: languages) {
    setSelectedLanguage(newLanguage);
  }

  return (
    <VStack>
      <HStack>
        <VStack>
          <Text>Language:</Text>
          <Menu>
            <MenuButton>{selectedLanguage}</MenuButton>
            <MenuList as={Button}>
              {languagesArray.map((lang, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleChangeLanguage(lang)}
                >
                  {lang}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </VStack>
      </HStack>
      <MonacoEditor
        height="60vh"
        defaultLanguage={selectedLanguage.toLowerCase()}
        defaultValue="// let's write some broken code 😈"
        onChange={(value) => onChange(value!)}
        theme="vs-dark"
      />
    </VStack>
  );
}
