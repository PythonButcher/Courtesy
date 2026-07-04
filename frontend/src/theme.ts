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
    text: {
      primary: '#e6edf3',
      secondary: '#8b949e',
    },
    divider: 'rgba(48, 54, 61, 0.8)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em' },
    h2: { fontWeight: 600, fontSize: '1.4rem', letterSpacing: '-0.01em' },
    h3: { fontWeight: 600, fontSize: '1.15rem' },
    h4: { fontWeight: 600, fontSize: '1rem' },
    h5: { fontWeight: 500, fontSize: '0.9rem' },
    h6: { fontWeight: 500, fontSize: '0.825rem' },
    body1: { fontSize: '0.875rem', lineHeight: 1.6 },
    body2: { fontSize: '0.8125rem', lineHeight: 1.5 },
    caption: { fontSize: '0.75rem', color: '#8b949e' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#30363d #0d1117',
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-track': { background: '#0d1117' },
          '&::-webkit-scrollbar-thumb': {
            background: '#30363d',
            borderRadius: 3,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(48, 54, 61, 0.6)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          margin: '2px 8px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(92, 138, 255, 0.12)',
            '&:hover': {
              backgroundColor: 'rgba(92, 138, 255, 0.18)',
            },
          },
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
