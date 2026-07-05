import { createTheme } from '@mui/material/styles';

/**
 * Courtesy MUI Theme
 *
 * Professional, dense, dark theme suitable for legal operations.
 * Color palette: Deep navy/slate backgrounds with blue-purple accents.
 */
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5c8aff',
      light: '#8aadff',
      dark: '#3a6bdb',
    },
    secondary: {
      main: '#7c5cbf',
      light: '#a88ae0',
      dark: '#5a3d9e',
    },
    background: {
      default: '#0d1117',
      paper: '#161b22',
    },
    text: {
      primary: '#c9d1d9',
      secondary: '#8b949e',
    },
    divider: '#30363d',
    error: {
      main: '#f85149',
    },
    warning: {
      main: '#d29922',
    },
    success: {
      main: '#3fb950',
    },
    info: {
      main: '#58a6ff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#f0f6fc' },
    h2: { fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.01em', color: '#f0f6fc' },
    h3: { fontSize: '1.25rem', fontWeight: 600, color: '#f0f6fc' },
    h4: { fontSize: '1rem', fontWeight: 600, color: '#f0f6fc' },
    body1: { fontSize: '0.875rem', lineHeight: 1.5 },
    body2: { fontSize: '0.8125rem', lineHeight: 1.43 },
    button: { textTransform: 'none', fontWeight: 500 },
    caption: { fontSize: '0.75rem', color: '#8b949e' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          padding: '6px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #30363d',
          backgroundColor: '#161b22',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '0.75rem',
        },
      },
    },
  },
});
