import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Router } from "./router/Router";

import theme from "./theme/theme";

export default function App() {
    return (
        <ChakraProvider theme={theme}>
            <RecoilRoot>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </RecoilRoot>
        </ChakraProvider>
    );
}
