import React, { useState, useEffect } from 'react';
import { Box, InputBase, Typography, IconButton, Badge, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import ClearIcon from '@mui/icons-material/Clear';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isOffline: boolean;
  filterCount?: number;
  onToggleFilters?: () => void;
}

/**
 * Top Bar with Search
 *
 * Application-wide search bar for filtering cases.
 * Features debounced input and an offline indicator.
 */
export function TopBar({ searchQuery, onSearchChange, isOffline, filterCount = 0, onToggleFilters }: TopBarProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== searchQuery) {
        onSearchChange(localQuery);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localQuery, searchQuery, onSearchChange]);

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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(48, 54, 61, 0.4)',
            borderRadius: '8px',
            px: 1.5,
            py: 0.5,
            width: 400,
            maxWidth: '100%',
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
            value={localQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalQuery(e.target.value)}
            endAdornment={
              localQuery ? (
                <IconButton size="small" onClick={() => setLocalQuery('')} sx={{ p: 0.25, mr: 0.5 }}>
                  <ClearIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                </IconButton>
              ) : null
            }
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

        {/* Filter Toggle */}
        {onToggleFilters && (
          <Tooltip title="Toggle Filters & Sort">
            <IconButton onClick={onToggleFilters} size="small" sx={{ color: filterCount > 0 ? 'primary.main' : 'text.secondary' }}>
              <Badge badgeContent={filterCount} color="primary" sx={{ '& .MuiBadge-badge': { transform: 'scale(0.8) translate(50%, -50%)' } }}>
                <FilterListIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Right-side info */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {isOffline ? (
          <Tooltip title="Backend is unreachable. Using mock data.">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CloudOffIcon sx={{ fontSize: 16, color: 'warning.main' }} />
              <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 500 }}>
                Offline (Mock Data)
              </Typography>
            </Box>
          </Tooltip>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
        )}
      </Box>
    </Box>
  );
}
