import { Box, Typography, Paper, Chip, Grid } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import GavelIcon from '@mui/icons-material/Gavel';
import type { CourtCase, Hearing, Task } from '../types';

interface DashboardProps {
  cases: CourtCase[];
  hearings: Hearing[];
  tasks: Task[];
  onNavigateToCase: (caseId: number) => void;
}

export function Dashboard({ cases, hearings, tasks, onNavigateToCase }: DashboardProps) {
  const activeCases = cases.filter((c) => c.status === 'Active' || c.status === 'Pending Review');
  const urgentTasks = tasks.filter((t) => t.status === 'overdue' || (t.status !== 'done' && t.priority === 'high'));
  const upcomingHearings = hearings.slice(0, 5); // Just take the first 5 for the docket

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, overflow: 'auto', backgroundColor: 'background.default' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h1" sx={{ mb: 1, fontSize: '1.75rem' }}>Good Morning</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          Here is the current operational overview for your docket.
        </Typography>

        {/* Key Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderLeft: '4px solid', borderColor: 'info.main' }}>
              <GavelIcon sx={{ fontSize: 32, color: 'info.main', opacity: 0.8 }} />
              <Box>
                <Typography variant="h2" sx={{ fontSize: '2rem', lineHeight: 1 }}>{activeCases.length}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Cases</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderLeft: '4px solid', borderColor: 'error.main' }}>
              <AssignmentLateIcon sx={{ fontSize: 32, color: 'error.main', opacity: 0.8 }} />
              <Box>
                <Typography variant="h2" sx={{ fontSize: '2rem', lineHeight: 1 }}>{urgentTasks.length}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Urgent Deadlines</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderLeft: '4px solid', borderColor: 'primary.main' }}>
              <EventIcon sx={{ fontSize: 32, color: 'primary.main', opacity: 0.8 }} />
              <Box>
                <Typography variant="h2" sx={{ fontSize: '2rem', lineHeight: 1 }}>{hearings.length}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Upcoming Hearings</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* Today's Docket */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: 2, fontSize: '1.25rem' }}>Today's Docket</Typography>
            <Paper sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '4px', overflow: 'hidden' }}>
              {upcomingHearings.length === 0 ? (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">No hearings scheduled for today.</Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {upcomingHearings.map((h, i) => (
                    <Box
                      key={h.hearing_id}
                      onClick={() => onNavigateToCase(h.case_id)}
                      sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        borderBottom: i !== upcomingHearings.length - 1 ? '1px solid' : 'none',
                        borderColor: 'divider',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.02)' },
                      }}
                    >
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>{h.hearing_type}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{h.case_number}</Typography>
                        </Box>
                        <Typography variant="body2" color="primary.main">{formatDate(h.hearing_date)} — {h.courtroom}</Typography>
                      </Box>
                      <ChevronRightIcon />
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Urgent Deadlines */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: 2, fontSize: '1.25rem' }}>Action Required</Typography>
            <Paper sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '4px', overflow: 'hidden' }}>
              {urgentTasks.length === 0 ? (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">No urgent tasks.</Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {urgentTasks.slice(0, 5).map((t, i) => (
                    <Box
                      key={t.task_id}
                      onClick={() => onNavigateToCase(t.case_id)}
                      sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        cursor: 'pointer',
                        borderLeft: t.status === 'overdue' ? '3px solid' : 'none',
                        borderLeftColor: 'error.main',
                        borderBottom: i !== Math.min(urgentTasks.length, 5) - 1 ? '1px solid' : 'none',
                        borderColor: 'divider',
                        backgroundColor: t.status === 'overdue' ? 'rgba(248, 81, 73, 0.04)' : 'transparent',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.02)' },
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>{t.title}</Typography>
                          {t.status === 'overdue' && (
                            <Chip label="OVERDUE" size="small" sx={{ height: 20, fontSize: '0.65rem', backgroundColor: 'rgba(248, 81, 73, 0.15)', color: 'error.main', fontWeight: 700 }} />
                          )}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{t.case_number}</Typography>
                          <Typography variant="body2" sx={{ color: t.status === 'overdue' ? 'error.main' : 'text.secondary' }}>Due {formatDate(t.due_date)}</Typography>
                        </Box>
                      </Box>
                      <ChevronRightIcon />
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// Minimal ChevronRight for row navigation
function ChevronRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}
