import { Box, Typography, Chip, Skeleton } from '@mui/material';
import type { CourtCase } from '../types';

interface CaseListProps {
  cases: CourtCase[];
  selectedCaseId: number | null;
  onSelectCase: (caseId: number) => void;
  loading: boolean;
}

const STATUS_COLORS: Record<string, 'success' | 'warning' | 'default' | 'error' | 'info'> = {
  Active: 'success',
  'Pending Review': 'warning',
  Closed: 'default',
  Dismissed: 'info',
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
export function CaseList({ cases, selectedCaseId, onSelectCase, loading }: CaseListProps) {
  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton
            key={i}
            variant="rounded"
            height={100}
            sx={{ mb: 1.5, bgcolor: 'rgba(48, 54, 61, 0.4)' }}
          />
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ p: 1.5 }}>
      <Typography
        variant="h3"
        sx={{ px: 1, py: 1, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}
      >
        Cases ({cases.length})
      </Typography>

      {cases.map((courtCase) => (
        <Box
          key={courtCase.case_id}
          onClick={() => onSelectCase(courtCase.case_id)}
          sx={{
            p: 1.5,
            mb: 0.75,
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor:
              selectedCaseId === courtCase.case_id
                ? 'rgba(92, 138, 255, 0.08)'
                : 'transparent',
            border: '1px solid',
            borderColor:
              selectedCaseId === courtCase.case_id
                ? 'rgba(92, 138, 255, 0.3)'
                : 'transparent',
            transition: 'all 0.15s ease',
            '&:hover': {
              backgroundColor:
                selectedCaseId === courtCase.case_id
                  ? 'rgba(92, 138, 255, 0.12)'
                  : 'rgba(48, 54, 61, 0.3)',
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

      {cases.length === 0 && (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No cases match your search.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
