import { ChakraProvider, Grid, GridItem, HStack } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Menubar } from "./components/organisms/Menubar";
import { Router } from "./router/Router";

import theme from "./theme/theme";

export default function App() {
  return (
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Grid gap='3'>
            <GridItem zIndex='1' position='fixed' w='130px'>
              <Menubar></Menubar>
            </GridItem>
            <GridItem ml='140px'>
              <Router/>
            </GridItem>
          </Grid>
        </BrowserRouter>
      </ChakraProvider>
  );
}