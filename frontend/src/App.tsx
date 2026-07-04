import { useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import type { CourtCase, CaseDetail } from './types';
import { fetchCases, fetchCaseDetail } from './services/courtApi';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { CaseList } from './components/CaseList';
import { CaseDetailPanel } from './components/CaseDetailPanel';

/**
 * Courtesy App – Main Application Shell
 *
 * The first screen is the actual court workspace, not a landing page.
 * Layout: left sidebar, top search bar, case list, and case detail panel.
 */
export default function App() {
  const [cases, setCases] = useState<CourtCase[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
  const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('cases');
  const [loading, setLoading] = useState(true);

  // Load cases on mount
  useEffect(() => {
    fetchCases()
      .then((data) => {
        setCases(data);
        if (data.length > 0) {
          setSelectedCaseId(data[0].case_id);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Load case detail when selection changes
  useEffect(() => {
    if (selectedCaseId !== null) {
      fetchCaseDetail(selectedCaseId).then(setCaseDetail);
    } else {
      setCaseDetail(null);
    }
  }, [selectedCaseId]);

  const handleSelectCase = useCallback((caseId: number) => {
    setSelectedCaseId(caseId);
  }, []);

  // Filter cases by search query
  const filteredCases = cases.filter((c) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.case_number.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.case_type.toLowerCase().includes(q) ||
      c.status.toLowerCase().includes(q) ||
      c.assigned_judge.toLowerCase().includes(q) ||
      c.parties.some((p) => p.name.toLowerCase().includes(q))
    );
  });

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Left Sidebar */}
      <Sidebar activeNav={activeNav} onNavigate={setActiveNav} />

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Search Bar */}
        <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* Content: Case List + Case Detail */}
        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Case List Panel */}
          <Box
            sx={{
              width: 420,
              minWidth: 360,
              borderRight: '1px solid',
              borderColor: 'divider',
              overflow: 'auto',
            }}
          >
            <CaseList
              cases={filteredCases}
              selectedCaseId={selectedCaseId}
              onSelectCase={handleSelectCase}
              loading={loading}
            />
          </Box>

          {/* Case Detail Panel */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <CaseDetailPanel caseDetail={caseDetail} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
