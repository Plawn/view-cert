import { CssBaseline, ThemeProvider } from '@mui/material';
import Home from './components/pages/Home/Home';
import { makeTheme } from './theme';

const theme = makeTheme({ dark: false });

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Home />
        </ThemeProvider>
    )
};