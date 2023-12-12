import { createTheme, responsiveFontSizes } from "@mui/material";

export const makeTheme = ({ dark }: { dark: boolean }) => {
  const theme = createTheme({
    palette: {
    //   type: dark ? "dark" : "light",
      primary: {
        main: "rgba(1, 68, 145, 1)",
      },
    },
    typography: {
      //        fontFamily: 'DIN',
    },
    shape: {
      borderRadius: 16,
    },
    // overrides: {
    //   MuiCard: {
    //     root: {
    //       overflow: "",
    //       " -webkit-backface-visibility": "hidden",
    //       margin: "2rem 0px",
    //       boxShadow: `
    //             rgba(0, 0, 0, 0.3) 0px 8px 40px -16px,
    //             0 6.7px 5.3px rgba(0, 0, 0, 0.048)
    //             !important`,
    //       // boxShadow: `  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    //       // 0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    //       // 0 12.5px 10px rgba(0, 0, 0, 0.06),
    //       // 0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    //       // 0 41.8px 33.4px rgba(0, 0, 0, 0.086)
    //       // !important
    //       // `,
    //       borderRadius: "1rem !important",
    //     }
    //   }
    // },
    // overrides: {
    //     MuiCssBaseline: {
    //       '@global': {
    //         '@font-face': [raleway],
    //       },
    //     },
    //   },
  });
  return responsiveFontSizes(theme);
};
