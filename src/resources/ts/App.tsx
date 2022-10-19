import { ChakraProvider } from "@chakra-ui/react";
import { DeleteButton } from "./components/atomic/buttons/DeleteButton";
import { CancelButton } from "./components/atomic/buttons/CancelButton";

import theme from "./theme/theme";

export default function App() {
  return (
      <ChakraProvider theme={theme}>
        
      </ChakraProvider>
  );
}