/**
 * Courtesy Frontend – Court API Service Layer
 *
 * All API calls go through this service. Components never call fetch() directly.
 * When the backend is unavailable, falls back to local mock data.
 *
 * TODO: Replace mock fallbacks with real API calls when the backend is connected.
 * TODO: Add AI_Tool bridge calls when the decision-prep packet exchange is implemented.
 */

import type { CourtCase, CaseDetail, Hearing, Task } from '../types';
import {
  MOCK_CASES,
  MOCK_HEARINGS,
  MOCK_TASKS,
  getMockCaseDetail,
} from '../data/mockData';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api';

/**
 * Generic fetch wrapper with mock fallback.
 */
async function apiFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${path}`);
    if (!response.ok) {
      console.warn(`API ${path} returned ${response.status}, using mock data`);
      return fallback;
    }
    return await response.json();
  } catch {
    console.warn(`API ${path} unreachable, using mock data`);
    return fallback;
  }
}

/** Fetch all cases */
export async function fetchCases(): Promise<CourtCase[]> {
  return apiFetch('/cases', MOCK_CASES);
}

/** Fetch a single case with full detail */
export async function fetchCaseDetail(caseId: number): Promise<CaseDetail | null> {
  const mockDetail = getMockCaseDetail(caseId);
  return apiFetch(`/cases/${caseId}`, mockDetail);
}

/** Fetch all hearings */
export async function fetchHearings(): Promise<Hearing[]> {
  return apiFetch('/hearings?upcoming=true', MOCK_HEARINGS.filter(h => !h.result_summary));
}

/** Fetch all tasks */
export async function fetchTasks(): Promise<Task[]> {
  return apiFetch('/tasks', MOCK_TASKS);
}

/** Check backend health */
export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/health`);
    if (!response.ok) return false;
    const data = await response.json();
    return data.status === 'ok';
  } catch {
    return false;
  }
}

// TODO: Future AI_Tool bridge integration
// export async function submitDecisionPrepPacket(packet: DecisionPrepPacket): Promise<DecisionSupportArtifact> {
//   // POST to /api/decision-prep
//   // Requires explicit user approval before sending
// }
