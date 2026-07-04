import React from 'react';
import { Box, InputBase, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

/**
 * Top Bar with Search
 *
 * Application-wide search bar for filtering cases.
 */
export function TopBar({ searchQuery, onSearchChange }: TopBarProps) {
  return (
    <Box
      sx={{
        height: 56,
        minHeight: 56,
        px: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      {/* Search Input */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(48, 54, 61, 0.4)',
          borderRadius: '8px',
          px: 1.5,
          py: 0.5,
          width: 400,
          maxWidth: '50%',
          border: '1px solid',
          borderColor: 'divider',
          transition: 'all 0.2s ease',
          '&:focus-within': {
            borderColor: 'primary.main',
            backgroundColor: 'rgba(48, 54, 61, 0.6)',
            boxShadow: '0 0 0 3px rgba(92, 138, 255, 0.1)',
          },
        }}
      >
        <SearchIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
        <InputBase
          placeholder="Search cases, parties, judges…"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          sx={{
            flex: 1,
            color: 'text.primary',
            fontSize: '0.875rem',
            '& input::placeholder': {
              color: 'text.secondary',
              opacity: 1,
            },
          }}
        />
      </Box>

      {/* Right-side info */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Mock Data Mode
        </Typography>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'warning.main',
            boxShadow: '0 0 6px rgba(210, 153, 34, 0.4)',
          }}
        />
      </Box>
    </Box>
  );
}
