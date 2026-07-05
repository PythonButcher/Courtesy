import React from 'react';
import { Box, Chip, Typography, FormControl, Select, MenuItem, InputLabel, Button, Collapse } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export interface Filters {
  status: string[];
  caseType: string[];
  court: string[];
  assignedJudge: string[];
}

export interface SortConfig {
  field: 'filing_date' | 'case_number' | 'status' | 'next_hearing';
  direction: 'asc' | 'desc';
}

interface FilterPanelProps {
  show: boolean;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  sortConfig: SortConfig;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  availableCourts: string[];
  availableJudges: string[];
}

const AVAILABLE_STATUSES = ['Active', 'Pending Review', 'Closed', 'Dismissed'];
const AVAILABLE_TYPES = ['Civil', 'Criminal', 'Family', 'Probate'];

export function FilterPanel({ show, filters, setFilters, sortConfig, setSortConfig, availableCourts, availableJudges }: FilterPanelProps) {
  const handleToggle = (key: keyof Filters, value: string) => {
    setFilters(prev => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]
      };
    });
  };

  const clearFilters = () => {
    setFilters({ status: [], caseType: [], court: [], assignedJudge: [] });
  };

  return (
    <Collapse in={show}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper' }}>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          
          {/* Status Filter */}
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1, fontWeight: 600, textTransform: 'uppercase' }}>
              Status
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {AVAILABLE_STATUSES.map(status => (
                <Chip
                  key={status}
                  label={status}
                  onClick={() => handleToggle('status', status)}
                  color={filters.status.includes(status) ? 'primary' : 'default'}
                  variant={filters.status.includes(status) ? 'filled' : 'outlined'}
                  size="small"
                />
              ))}
            </Box>
          </Box>

          {/* Type Filter */}
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1, fontWeight: 600, textTransform: 'uppercase' }}>
              Case Type
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {AVAILABLE_TYPES.map(type => (
                <Chip
                  key={type}
                  label={type}
                  onClick={() => handleToggle('caseType', type)}
                  color={filters.caseType.includes(type) ? 'secondary' : 'default'}
                  variant={filters.caseType.includes(type) ? 'filled' : 'outlined'}
                  size="small"
                />
              ))}
            </Box>
          </Box>

          {/* Court Filter */}
          {availableCourts.length > 0 && (
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1, fontWeight: 600, textTransform: 'uppercase' }}>
                Court
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {availableCourts.map(court => (
                  <Chip
                    key={court}
                    label={court}
                    onClick={() => handleToggle('court', court)}
                    color={filters.court.includes(court) ? 'info' : 'default'}
                    variant={filters.court.includes(court) ? 'filled' : 'outlined'}
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Judge Filter */}
          {availableJudges.length > 0 && (
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1, fontWeight: 600, textTransform: 'uppercase' }}>
                Assigned Judge
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {availableJudges.map(judge => (
                  <Chip
                    key={judge}
                    label={judge}
                    onClick={() => handleToggle('assignedJudge', judge)}
                    color={filters.assignedJudge.includes(judge) ? 'success' : 'default'}
                    variant={filters.assignedJudge.includes(judge) ? 'filled' : 'outlined'}
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Sort Controls */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel sx={{ fontSize: '0.8rem' }}>Sort By</InputLabel>
              <Select
                value={sortConfig.field}
                label="Sort By"
                onChange={(e) => setSortConfig(prev => ({ ...prev, field: e.target.value as SortConfig['field'] }))}
                sx={{ fontSize: '0.85rem', height: 32 }}
              >
                <MenuItem value="filing_date">Filing Date</MenuItem>
                <MenuItem value="case_number">Case Number</MenuItem>
                <MenuItem value="next_hearing">Next Hearing</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel sx={{ fontSize: '0.8rem' }}>Order</InputLabel>
              <Select
                value={sortConfig.direction}
                label="Order"
                onChange={(e) => setSortConfig(prev => ({ ...prev, direction: e.target.value as SortConfig['direction'] }))}
                sx={{ fontSize: '0.85rem', height: 32 }}
              >
                <MenuItem value="desc">Descending</MenuItem>
                <MenuItem value="asc">Ascending</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={clearFilters}
              startIcon={<ClearIcon />}
              sx={{ height: 32, borderColor: 'divider', color: 'text.secondary' }}
            >
              Clear
            </Button>
          </Box>

        </Box>
      </Box>
    </Collapse>
  );
}
