import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#03045E",
        color: "#DEDEDE",
        margin: {
          lg: '5%',
          base: 0,
        },
        hieght: "100%",
      }
    }
  },
  colors: {
    main: {
      1: "#03045E",
      2: {
        100: "#023E8A",
        50: "background: rgba(2, 62, 138, 0.5)",
      }
    },
    sub: {
      1: "#0077B6",
      2: "#0096C7",
    },
    font: {
      100: "#DEDEDE",
      70: "rgba(222, 222, 222, 0.7)",
    },
    high: "#F56565",
    middle: "#ECC94B",
    low: "#38A169",
  }
});

export default theme;
