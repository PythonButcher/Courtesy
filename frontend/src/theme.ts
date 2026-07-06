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
      main: '#4F46E5', // Indigo
      light: '#818CF8',
      dark: '#3730A3',
    },
    secondary: {
      main: '#B45309', // Amber/Bronze for legal accent
      light: '#F59E0B',
      dark: '#78350F',
    },
    background: {
      default: '#090A0C',
      paper: '#121418',
    },
    text: {
      primary: '#F3F4F6',
      secondary: '#9CA3AF',
    },
    divider: '#272A30',
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F59E0B',
    },
    success: {
      main: '#10B981',
    },
    info: {
      main: '#3B82F6',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Merriweather", "Georgia", serif', fontSize: '1.75rem', fontWeight: 700, color: '#F9FAFB' },
    h2: { fontFamily: '"Merriweather", "Georgia", serif', fontSize: '1.35rem', fontWeight: 700, color: '#F9FAFB' },
    h3: { fontFamily: '"Merriweather", "Georgia", serif', fontSize: '1.15rem', fontWeight: 600, color: '#F9FAFB' },
    h4: { fontFamily: '"Inter", sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' },
    body1: { fontSize: '0.9rem', lineHeight: 1.6 },
    body2: { fontSize: '0.8125rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 600, fontFamily: '"Inter", sans-serif' },
    caption: { fontSize: '0.75rem', color: '#6B7280' },
  },
  shape: {
    borderRadius: 2, // Very sharp corners for a serious document feel
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
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
          border: '1px solid #272A30',
          backgroundColor: '#121418',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.7rem',
          borderRadius: '2px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
      },
    },
  },
});
