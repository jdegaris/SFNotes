import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(0, 60, 114, 1)',
        },
        secondary: {
            main: 'rgba(243, 48, 38, 1)',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
        progressBar: {
            default: '#1C140D'
        }
    },
});

export default theme;