import { Box, Typography, Chip, Skeleton, Button } from '@mui/material';
import type { CourtCase } from '../types';
import ClearIcon from '@mui/icons-material/Clear';

interface CaseListProps {
  cases: CourtCase[];
  selectedCaseId: number | null;
  onSelectCase: (caseId: number) => void;
  loading: boolean;
  onClearFilters?: () => void;
}

const STATUS_COLORS: Record<string, 'success' | 'warning' | 'default' | 'error' | 'info'> = {
  Active: 'info',
  Closed: 'default',
  Pending: 'warning',
  'Pending Review': 'warning',
  Dismissed: 'default',
  Settled: 'success',
};

const TYPE_COLORS: Record<string, string> = {
  Civil: '#58a6ff',
  Criminal: '#f85149',
  Family: '#d29922',
  Probate: '#8b949e',
};

/**
 * Case List Panel
 *
 * Displays a scrollable list of court cases with status chips
 * and type indicators.
 */
export function CaseList({ cases, selectedCaseId, onSelectCase, loading, onClearFilters }: CaseListProps) {
  if (loading) {
    return (
      <Box sx={{ width: '100%', p: 2 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Box key={i} sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Skeleton variant="text" width={120} />
              <Skeleton variant="rounded" width={60} height={20} />
            </Box>
            <Skeleton variant="text" width="80%" />
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper', position: 'sticky', top: 0, zIndex: 2 }}>
        <Typography
          variant="h3"
          sx={{ color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
        >
          Cases ({cases.length})
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {cases.map((courtCase) => (
        <Box
          key={courtCase.case_id}
          onClick={() => onSelectCase(courtCase.case_id)}
          sx={{
            p: 2,
            cursor: 'pointer',
            borderBottom: '1px solid',
            borderColor: 'divider',
            backgroundColor:
              selectedCaseId === courtCase.case_id
                ? 'rgba(92, 138, 255, 0.05)'
                : 'transparent',
            borderLeft: '3px solid',
            borderLeftColor:
              selectedCaseId === courtCase.case_id
                ? 'primary.main'
                : 'transparent',
            transition: 'background-color 0.1s ease',
            '&:hover': {
              backgroundColor:
                selectedCaseId === courtCase.case_id
                  ? 'rgba(92, 138, 255, 0.08)'
                  : 'rgba(255, 255, 255, 0.02)',
            },
          }}
        >
          {/* Case Number + Status */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 4,
                  height: 16,
                  borderRadius: 2,
                  backgroundColor: TYPE_COLORS[courtCase.case_type] || '#8b949e',
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                {courtCase.case_number}
              </Typography>
            </Box>
            <Chip
              label={courtCase.status}
              size="small"
              color={STATUS_COLORS[courtCase.status] || 'default'}
              variant="outlined"
              sx={{ height: 22, fontSize: '0.7rem' }}
            />
          </Box>

          {/* Case Type + Judge */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Chip
              label={courtCase.case_type}
              size="small"
              sx={{
                height: 20,
                fontSize: '0.675rem',
                backgroundColor: `${TYPE_COLORS[courtCase.case_type]}15`,
                color: TYPE_COLORS[courtCase.case_type],
                border: 'none',
              }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {courtCase.assigned_judge}
            </Typography>
          </Box>

          {/* Parties */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.775rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {courtCase.parties.map((p) => p.name).join(' v. ')}
          </Typography>
        </Box>
      ))}
      </Box>

      {cases.length === 0 && (
        <Box sx={{ p: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            No cases match your filters.
          </Typography>
          {onClearFilters && (
            <Button size="small" variant="outlined" onClick={onClearFilters} startIcon={<ClearIcon />}>
              Clear Filters
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}
