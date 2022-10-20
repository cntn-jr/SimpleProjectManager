import { ChakraProvider, HStack, Stack } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Menubar } from "./components/organisms/Menubar";
import { Router } from "./router/Router";

import theme from "./theme/theme";

export default function App() {
  return (
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <HStack mx='120px' mt='120px'>
            <Menubar></Menubar>
            <Router/>
          </HStack>
        </BrowserRouter>
      </ChakraProvider>
  );
}