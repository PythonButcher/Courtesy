import { useState, useEffect, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import type { CourtCase, CaseDetail } from './types';
import { fetchCases, fetchCaseDetail, checkHealth } from './services/courtApi';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FilterPanel, Filters, SortConfig } from './components/FilterPanel';
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

  // Offline state
  const [isOffline, setIsOffline] = useState(false);

  // Filters & Sort State
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>(() => {
    const saved = localStorage.getItem('courtesy_filters');
    return saved ? JSON.parse(saved) : { status: [], caseType: [], court: [], assignedJudge: [] };
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>(() => {
    const saved = localStorage.getItem('courtesy_sort');
    return saved ? JSON.parse(saved) : { field: 'filing_date', direction: 'desc' };
  });

  // Save filters & sort
  useEffect(() => {
    localStorage.setItem('courtesy_filters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    localStorage.setItem('courtesy_sort', JSON.stringify(sortConfig));
  }, [sortConfig]);

  // Initial load
  useEffect(() => {
    checkHealth().then((isHealthy) => setIsOffline(!isHealthy));

    fetchCases()
      .then((data) => {
        setCases(data);
        if (data.length > 0) {
          setSelectedCaseId(data[0].case_id);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Load case detail
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

  const handleClearFilters = useCallback(() => {
    setFilters({ status: [], caseType: [], court: [], assignedJudge: [] });
    setSearchQuery('');
  }, []);

  const availableCourts = useMemo(() => Array.from(new Set(cases.map(c => c.court_name))).sort(), [cases]);
  const availableJudges = useMemo(() => Array.from(new Set(cases.map(c => c.assigned_judge))).sort(), [cases]);

  // Compute filtered & sorted cases
  const filteredAndSortedCases = useMemo(() => {
    let result = [...cases];

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.case_number.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.case_type.toLowerCase().includes(q) ||
          c.status.toLowerCase().includes(q) ||
          c.assigned_judge.toLowerCase().includes(q) ||
          c.parties.some((p) => p.name.toLowerCase().includes(q))
      );
    }

    // Filters
    if (filters.status && filters.status.length > 0) {
      result = result.filter((c) => filters.status.includes(c.status));
    }
    if (filters.caseType && filters.caseType.length > 0) {
      result = result.filter((c) => filters.caseType.includes(c.case_type));
    }
    if (filters.court && filters.court.length > 0) {
      result = result.filter((c) => filters.court.includes(c.court_name));
    }
    if (filters.assignedJudge && filters.assignedJudge.length > 0) {
      result = result.filter((c) => filters.assignedJudge.includes(c.assigned_judge));
    }

    // Sorting
    result.sort((a, b) => {
      let valA: any = a[sortConfig.field as keyof CourtCase];
      let valB: any = b[sortConfig.field as keyof CourtCase];

      // Handle next_hearing sorting (not in CourtCase type, might be null, but we sort based on what we have, skip for now if not present)
      // For filing_date
      if (sortConfig.field === 'filing_date') {
        valA = new Date(a.filing_date).getTime();
        valB = new Date(b.filing_date).getTime();
      }

      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [cases, searchQuery, filters, sortConfig]);

  const filterCount = (filters.status?.length || 0) + (filters.caseType?.length || 0) + (filters.court?.length || 0) + (filters.assignedJudge?.length || 0) + (searchQuery ? 1 : 0);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Left Sidebar */}
      <Sidebar activeNav={activeNav} onNavigate={setActiveNav} />

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Search Bar */}
        <TopBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isOffline={isOffline}
          filterCount={filterCount}
          onToggleFilters={() => setShowFilters(prev => !prev)}
        />

        <FilterPanel
          show={showFilters}
          filters={filters}
          setFilters={setFilters}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          availableCourts={availableCourts}
          availableJudges={availableJudges}
        />

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
              cases={filteredAndSortedCases}
              selectedCaseId={selectedCaseId}
              onSelectCase={handleSelectCase}
              loading={loading}
              onClearFilters={handleClearFilters}
            />
          </Box>

          {/* Case Detail Panel */}
          <Box sx={{ flex: 1, overflow: 'auto', position: 'relative' }}>
            <CaseDetailPanel caseDetail={caseDetail} loading={loading} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
