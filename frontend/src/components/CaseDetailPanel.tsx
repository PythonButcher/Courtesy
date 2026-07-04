import React from 'react';
import { Box, Typography, Chip, Paper, Divider, Alert } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import DescriptionIcon from '@mui/icons-material/Description';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import type { CaseDetail } from '../types';

interface CaseDetailPanelProps {
  caseDetail: CaseDetail | null;
}

const PRIORITY_COLORS: Record<string, string> = {
  high: '#f85149',
  medium: '#d29922',
  low: '#3fb950',
};

const TASK_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  overdue: { label: 'OVERDUE', color: '#f85149' },
  pending: { label: 'Pending', color: '#d29922' },
  in_progress: { label: 'In Progress', color: '#58a6ff' },
  done: { label: 'Done', color: '#3fb950' },
};

/**
 * Case Detail Panel
 *
 * Shows full detail for a selected case, including:
 * - Case header with parties, judge, court
 * - Upcoming hearings section
 * - Tasks & deadlines section (with overdue highlighting)
 * - Documents section
 * - Decision-prep notes panel (labeled as draft research aid)
 */
export function CaseDetailPanel({ caseDetail }: CaseDetailPanelProps) {
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
    <Box sx={{ p: 3, maxWidth: 900 }}>
      {/* Case Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant="h1" sx={{ fontSize: '1.5rem' }}>
            {caseDetail.case_number}
          </Typography>
          <Chip
            label={caseDetail.status}
            color={caseDetail.status === 'Active' ? 'success' : caseDetail.status === 'Pending Review' ? 'warning' : 'default'}
            size="small"
            sx={{ fontWeight: 600 }}
          />
          <Chip label={caseDetail.case_type} size="small" variant="outlined" />
        </Box>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1.5, lineHeight: 1.7 }}>
          {caseDetail.description}
        </Typography>

        {/* Case Metadata Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2 }}>
          <MetaItem label="Court" value={caseDetail.court_name} />
          <MetaItem label="Judge" value={caseDetail.assigned_judge} />
          <MetaItem label="Filed" value={formatDate(caseDetail.filing_date)} />
          <MetaItem
            label="Parties"
            value={caseDetail.parties.map((p) => `${p.name} (${p.role})`).join(', ')}
          />
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Two-column layout for hearings/tasks and documents/decision-prep */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        {/* Left Column */}
        <Box>
          {/* Upcoming Hearings */}
          <SectionHeader icon={<EventIcon />} title="Upcoming Hearings" count={upcomingHearings.length} />
          {upcomingHearings.length > 0 ? (
            upcomingHearings.map((h) => (
              <Paper key={h.hearing_id} sx={{ p: 2, mb: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {h.hearing_type}
                  </Typography>
                  <Chip label={h.courtroom} size="small" variant="outlined" sx={{ fontSize: '0.7rem', height: 22 }} />
                </Box>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 500 }}>
                  {formatDate(h.hearing_date)}
                </Typography>
              </Paper>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
              No upcoming hearings scheduled.
            </Typography>
          )}

          {/* Past Hearings */}
          {pastHearings.length > 0 && (
            <>
              <Typography variant="caption" sx={{ display: 'block', mt: 2, mb: 1, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Past Hearings
              </Typography>
              {pastHearings.map((h) => (
                <Paper key={h.hearing_id} sx={{ p: 2, mb: 1.5, opacity: 0.7 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {h.hearing_type} — {formatDate(h.hearing_date)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {h.result_summary}
                  </Typography>
                </Paper>
              ))}
            </>
          )}

          {/* Tasks & Deadlines */}
          <Box sx={{ mt: 3 }}>
            <SectionHeader icon={<AssignmentLateIcon />} title="Tasks & Deadlines" count={caseDetail.tasks?.length || 0} />
            {caseDetail.tasks?.map((task) => {
              const statusInfo = TASK_STATUS_LABELS[task.status] || { label: task.status, color: '#8b949e' };
              return (
                <Paper
                  key={task.task_id}
                  sx={{
                    p: 2,
                    mb: 1.5,
                    borderLeft: `3px solid ${PRIORITY_COLORS[task.priority] || '#8b949e'}`,
                    ...(task.status === 'overdue' && {
                      backgroundColor: 'rgba(248, 81, 73, 0.06)',
                    }),
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, flex: 1, mr: 1 }}>
                      {task.status === 'overdue' && (
                        <WarningAmberIcon sx={{ fontSize: 14, color: 'error.main', mr: 0.5, verticalAlign: 'text-bottom' }} />
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
                        backgroundColor: `${statusInfo.color}20`,
                        color: statusInfo.color,
                        border: 'none',
                      }}
                    />
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                    {task.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography variant="caption" sx={{ color: task.status === 'overdue' ? 'error.main' : 'text.secondary', fontWeight: 500 }}>
                      Due: {formatDate(task.due_date)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Priority: {task.priority}
                    </Typography>
                  </Box>
                </Paper>
              );
            })}
          </Box>
        </Box>

        {/* Right Column */}
        <Box>
          {/* Documents */}
          <SectionHeader icon={<DescriptionIcon />} title="Documents" count={caseDetail.documents?.length || 0} />
          {caseDetail.documents?.map((doc) => (
            <Paper key={doc.document_id} sx={{ p: 2, mb: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                {doc.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Chip label={doc.document_type} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 20 }} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Filed {formatDate(doc.filed_date)} by {doc.filed_by}
                </Typography>
              </Box>
            </Paper>
          )) || (
            <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
              No documents on file.
            </Typography>
          )}

          {/* Decision Prep Notes */}
          <Box sx={{ mt: 3 }}>
            <SectionHeader icon={<PsychologyIcon />} title="Decision Prep" count={caseDetail.decision_prep_notes?.length || 0} />
            <Alert
              severity="info"
              sx={{
                mb: 1.5,
                fontSize: '0.75rem',
                backgroundColor: 'rgba(88, 166, 255, 0.06)',
                border: '1px solid rgba(88, 166, 255, 0.15)',
                '& .MuiAlert-icon': { fontSize: 18 },
              }}
            >
              Decision prep notes are <strong>draft research aids</strong> for case review.
              They are not legal advice, predictions, or final recommendations.
            </Alert>

            {caseDetail.decision_prep_notes?.map((note) => (
              <Paper
                key={note.note_id}
                sx={{
                  p: 2,
                  mb: 1.5,
                  borderLeft: '3px solid',
                  borderColor: 'secondary.main',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {note.title}
                  </Typography>
                  <Chip
                    label={note.label}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      backgroundColor: 'rgba(124, 92, 191, 0.15)',
                      color: 'secondary.light',
                      border: 'none',
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1 }}>
                  {note.content}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Updated {formatDateTime(note.updated_at)}
                </Typography>
              </Paper>
            )) || (
              <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                No decision-prep notes for this case.
              </Typography>
            )}

            {/* AI Bridge Placeholder */}
            <Paper
              sx={{
                p: 2,
                mt: 2,
                border: '1px dashed',
                borderColor: 'divider',
                backgroundColor: 'transparent',
                opacity: 0.6,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5, color: 'text.secondary' }}>
                AI Decision Support — Not Connected
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                When connected to AI_Tool Decision Intelligence, you can submit a decision-prep
                packet for draft analysis. This feature requires explicit user approval before
                sending any case data.
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* --- Helper Components --- */

function SectionHeader({ icon, title, count }: { icon: React.ReactNode; title: string; count: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
      <Box sx={{ color: 'text.secondary', display: 'flex' }}>{icon}</Box>
      <Typography variant="h4" sx={{ fontSize: '0.9rem' }}>
        {title}
      </Typography>
      <Chip
        label={count}
        size="small"
        sx={{ height: 20, minWidth: 24, fontSize: '0.7rem', fontWeight: 600 }}
      />
    </Box>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.675rem' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 500, mt: 0.25 }}>
        {value}
      </Typography>
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
