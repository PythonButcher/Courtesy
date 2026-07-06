import React, { useState } from 'react';
import { Box, Typography, Chip, Paper, Divider, Alert, Tabs, Tab, Skeleton, Button } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import DescriptionIcon from '@mui/icons-material/Description';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { CaseDetail } from '../types';

interface CaseDetailPanelProps {
  caseDetail: CaseDetail | null;
  loading?: boolean;
  onBack?: () => void;
}

const PRIORITY_COLORS: Record<string, string> = {
  high: '#f85149',
  medium: '#d29922',
  low: '#3fb950',
};

const TASK_STATUS_LABELS: Record<string, { label: string; color: string; muted?: boolean }> = {
  overdue: { label: 'OVERDUE', color: '#f85149' },
  pending: { label: 'Upcoming', color: '#d29922' },
  in_progress: { label: 'In Progress', color: '#58a6ff' },
  done: { label: 'Complete', color: '#8b949e', muted: true },
};

const STATUS_COLORS: Record<string, 'success' | 'warning' | 'default' | 'error' | 'info'> = {
  Active: 'info',
  Closed: 'default',
  Pending: 'warning',
  'Pending Review': 'warning',
  Dismissed: 'default',
  Settled: 'success',
};

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`case-tabpanel-${index}`}
      aria-labelledby={`case-tab-${index}`}
      {...other}
      style={{ height: '100%' }}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export function CaseDetailPanel({ caseDetail, loading, onBack }: CaseDetailPanelProps) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, maxWidth: 1000 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="text" width="60%" />
          </Box>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Skeleton variant="text" width={80} height={40} />
            <Skeleton variant="text" width={80} height={40} />
            <Skeleton variant="text" width={80} height={40} />
          </Box>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 1 }} />
      </Box>
    );
  }

  if (!caseDetail) {
    return (
      <Box sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Typography variant="body1" color="text.secondary">
          Select a case to view details
        </Typography>
      </Box>
    );
  }

  const upcomingHearings = caseDetail.hearings?.filter((h) => !h.result_summary) || [];
  const pastHearings = caseDetail.hearings?.filter((h) => h.result_summary) || [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Sticky Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: '#0d1117', // Match background
          pt: 3,
          px: 3,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ mb: 3, maxWidth: 1000, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            {onBack && (
              <Button onClick={onBack} startIcon={<ArrowBackIcon />} size="small" sx={{ mb: 1, ml: -1, color: 'text.secondary' }}>
                Back
              </Button>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Typography variant="h1" sx={{ fontSize: '1.35rem', letterSpacing: '-0.02em', color: 'text.primary' }}>
                {caseDetail.case_number}
              </Typography>
              <Chip
                label={caseDetail.status}
                color={STATUS_COLORS[caseDetail.status] || 'default'}
                size="small"
                sx={{ fontWeight: 600, height: 22, fontSize: '0.7rem', opacity: caseDetail.status === 'Dismissed' ? 0.7 : 1 }}
              />
              <Chip label={caseDetail.case_type} size="small" variant="outlined" sx={{ height: 22, fontSize: '0.7rem' }} />
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {caseDetail.parties.map((p) => p.name).join(' v. ')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 4, textAlign: 'right' }}>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Court</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>{caseDetail.court_name}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Judge</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>{caseDetail.assigned_judge}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filed</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>{formatDate(caseDetail.filing_date)}</Typography>
            </Box>
          </Box>
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ minHeight: 40 }}
        >
          <Tab icon={<InfoIcon sx={{ fontSize: 18 }}/>} iconPosition="start" label="Overview" />
          <Tab icon={<EventIcon sx={{ fontSize: 18 }}/>} iconPosition="start" label={`Hearings (${caseDetail.hearings?.length || 0})`} />
          <Tab icon={<AssignmentLateIcon sx={{ fontSize: 18 }}/>} iconPosition="start" label={`Tasks (${caseDetail.tasks?.length || 0})`} />
          <Tab icon={<DescriptionIcon sx={{ fontSize: 18 }}/>} iconPosition="start" label={`Documents (${caseDetail.documents?.length || 0})`} />
          <Tab icon={<PeopleIcon sx={{ fontSize: 18 }}/>} iconPosition="start" label={`Parties (${caseDetail.parties?.length || 0})`} />
          <Tab icon={<PsychologyIcon sx={{ fontSize: 18 }}/>} iconPosition="start" label="Decision Prep" />
        </Tabs>
      </Box>

      {/* Scrollable Content Area */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 3, maxWidth: 900 }}>
        {/* Tab 0: Overview */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
            <Box>
              <Typography variant="h3" sx={{ mb: 2, fontSize: '1.125rem' }}>Case Posture</Typography>
              <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {caseDetail.description || 'No case description provided.'}
                </Typography>
              </Paper>
              <Typography variant="h3" sx={{ mb: 2, fontSize: '1.125rem' }}>Next Hearing</Typography>
              {upcomingHearings.length > 0 ? (
                <Paper sx={{ p: 3, borderLeft: '4px solid', borderColor: 'primary.main' }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>{upcomingHearings[0].hearing_type}</Typography>
                  <Typography variant="body2" sx={{ color: 'primary.main', mb: 1 }}>{formatDate(upcomingHearings[0].hearing_date)} — {upcomingHearings[0].courtroom}</Typography>
                </Paper>
              ) : (
                <Paper sx={{ p: 3, backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>No upcoming hearings scheduled.</Typography>
                </Paper>
              )}
            </Box>

            <Box>
              <Typography variant="h3" sx={{ mb: 2, fontSize: '1.125rem' }}>Action Required</Typography>
              <Paper sx={{ p: 0, overflow: 'hidden' }}>
                <Box sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{caseDetail.tasks?.filter(t => t.status !== 'done').length || 0} Open Tasks</Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                  {caseDetail.tasks?.filter(t => t.status !== 'done').slice(0, 3).map(task => (
                    <Box key={task.task_id} sx={{ mb: 1.5, '&:last-child': { mb: 0 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.title}</Typography>
                        {task.status === 'overdue' && <Chip label="OVERDUE" size="small" sx={{ height: 16, fontSize: '0.6rem', backgroundColor: 'rgba(248,81,73,0.15)', color: 'error.main' }} />}
                      </Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>Due {formatDate(task.due_date)}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Box>
          </Box>
        </TabPanel>

        {/* Tab 1: Hearings */}
        <TabPanel value={tabValue} index={1}>
          {upcomingHearings.length === 0 && pastHearings.length === 0 && (
            <Typography variant="body2" color="text.secondary">No hearings scheduled.</Typography>
          )}

          {upcomingHearings.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ mb: 2, color: 'text.primary' }}>Upcoming</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {upcomingHearings.map((h) => (
                  <Box key={h.hearing_id} sx={{ py: 1.5, px: 2, borderLeft: '3px solid', borderColor: 'primary.main', borderBottom: '1px solid', borderBottomColor: 'divider', backgroundColor: 'rgba(92, 138, 255, 0.03)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{h.hearing_type}</Typography>
                        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500, mt: 0.5 }}>
                          {formatDate(h.hearing_date)}
                        </Typography>
                      </Box>
                      <Chip label={h.courtroom} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {pastHearings.length > 0 && (
            <Box>
              <Typography variant="h4" sx={{ mb: 2, color: 'text.secondary' }}>Past</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {pastHearings.map((h) => (
                  <Box key={h.hearing_id} sx={{ py: 1.5, px: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        {h.hearing_type} — {formatDate(h.hearing_date)}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{h.courtroom}</Typography>
                    </Box>
                    {h.result_summary && (
                      <Typography variant="body2" sx={{ color: 'text.secondary', p: 1.5, backgroundColor: 'rgba(0,0,0,0.2)', borderLeft: '2px solid', borderColor: 'divider' }}>
                        <strong>Result:</strong> {h.result_summary}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </TabPanel>

        {/* Tab 2: Tasks */}
        <TabPanel value={tabValue} index={2}>
          {!caseDetail.tasks || caseDetail.tasks.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No tasks assigned to this case.</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Sort tasks: overdue first, then pending/in_progress, then done */}
              {[...caseDetail.tasks]
                .sort((a, b) => {
                  const valA = a.status === 'overdue' ? 0 : a.status === 'done' ? 2 : 1;
                  const valB = b.status === 'overdue' ? 0 : b.status === 'done' ? 2 : 1;
                  return valA - valB;
                })
                .map((task) => {
                  const statusInfo = TASK_STATUS_LABELS[task.status] || { label: task.status, color: '#8b949e' };
                  return (
                    <Box
                      key={task.task_id}
                      sx={{
                        py: 2,
                        px: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        borderLeft: `3px solid ${PRIORITY_COLORS[task.priority] || '#8b949e'}`,
                        opacity: statusInfo.muted ? 0.6 : 1,
                        ...(task.status === 'overdue' && {
                          backgroundColor: 'rgba(248, 81, 73, 0.04)',
                        }),
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5,
                        transition: 'background-color 0.1s ease',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.02)' }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, flex: 1, mr: 1, textDecoration: task.status === 'done' ? 'line-through' : 'none' }}>
                          {task.status === 'overdue' && (
                            <WarningAmberIcon sx={{ fontSize: 16, color: 'error.main', mr: 0.5, verticalAlign: 'text-bottom' }} />
                          )}
                          {task.title}
                        </Typography>
                        <Chip
                          label={statusInfo.label}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            backgroundColor: `${statusInfo.color}15`,
                            color: statusInfo.color,
                            border: 'none',
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                        {task.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 3 }}>
                        <Typography variant="caption" sx={{ color: task.status === 'overdue' ? 'error.main' : 'text.secondary', fontWeight: 500 }}>
                          Due: {formatDate(task.due_date)}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Priority: <span style={{ color: PRIORITY_COLORS[task.priority] }}>{task.priority.toUpperCase()}</span>
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Assignee: {task.assigned_to}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          )}
        </TabPanel>

        {/* Tab 3: Documents */}
        <TabPanel value={tabValue} index={3}>
          {!caseDetail.documents || caseDetail.documents.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No documents on file.</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {caseDetail.documents.map((doc) => (
                <Box key={doc.document_id} sx={{ py: 1.5, px: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid', borderColor: 'divider', '&:hover': { backgroundColor: 'rgba(255,255,255,0.02)' } }}>
                  <DescriptionIcon sx={{ color: 'text.secondary', fontSize: 24 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{doc.title}</Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 0.5, alignItems: 'center' }}>
                      <Chip label={doc.document_type} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 20 }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Filed {formatDate(doc.filed_date)} by {doc.filed_by}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </TabPanel>

        {/* Tab 4: Parties */}
        <TabPanel value={tabValue} index={4}>
          {!caseDetail.parties || caseDetail.parties.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No parties associated with this case.</Typography>
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1px', backgroundColor: 'divider', border: '1px solid', borderColor: 'divider' }}>
              {caseDetail.parties.map((party, idx) => (
                <Box key={idx} sx={{ p: 2, backgroundColor: 'background.default' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', mb: 0.5 }}>
                    {party.role}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PeopleIcon sx={{ color: 'primary.main', fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{party.name}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </TabPanel>

        {/* Tab 5: Decision Prep */}
        <TabPanel value={tabValue} index={5}>
          <Alert
            severity="info"
            sx={{
              mb: 3,
              fontSize: '0.8rem',
              backgroundColor: 'rgba(88, 166, 255, 0.06)',
              border: '1px solid rgba(88, 166, 255, 0.15)',
              '& .MuiAlert-icon': { fontSize: 20 },
            }}
          >
            Decision prep notes are <strong>draft research aids</strong> for case review.
            They are not legal advice, predictions, or final recommendations.
          </Alert>

          {!caseDetail.decision_prep_notes || caseDetail.decision_prep_notes.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No decision-prep notes for this case.</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {caseDetail.decision_prep_notes.map((note) => (
                <Box key={note.note_id} sx={{ py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'secondary.light' }}>{note.title}</Typography>
                    <Chip
                      label={note.label}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(124, 92, 191, 0.15)',
                        color: 'secondary.light',
                        border: 'none',
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 1 }}>
                    {note.content}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Updated {formatDateTime(note.updated_at)}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* AI Bridge Placeholder */}
          <Paper sx={{ p: 3, mt: 4, border: '1px dashed', borderColor: 'divider', backgroundColor: 'transparent', opacity: 0.7 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, color: 'text.secondary' }}>
              AI Decision Support — Not Connected
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              When connected to AI_Tool Decision Intelligence, you can submit a decision-prep
              packet for draft analysis. This feature requires explicit user approval before
              sending any case data.
            </Typography>
          </Paper>
        </TabPanel>
      </Box>
    </Box>
  );
}

/* --- Formatting Helpers --- */

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function formatDateTime(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}
