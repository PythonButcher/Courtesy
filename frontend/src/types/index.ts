/**
 * Courtesy Frontend – Type Definitions
 *
 * TypeScript interfaces for court domain entities.
 * These align with the PostgreSQL schema in `Courtesy Postgres Schema.md`.
 */

export interface Party {
  name: string;
  role: string;
}

export interface CourtCase {
  case_id: number;
  case_number: string;
  case_type_id: number;
  case_type: string;
  case_status_id: number;
  status: string;
  filing_date: string;
  court_id: number;
  court_name: string;
  assigned_judge_id: number;
  assigned_judge: string;
  description: string;
  parties: Party[];
}

export interface CaseDetail extends CourtCase {
  hearings: Hearing[];
  tasks: Task[];
  documents: Document[];
  decision_prep_notes: DecisionPrepNote[];
}

export interface Hearing {
  hearing_id: number;
  case_id: number;
  case_number: string;
  hearing_type: string;
  hearing_date: string;
  courtroom: string;
  result_summary: string | null;
}

export interface Task {
  task_id: number;
  case_id: number;
  case_number: string;
  title: string;
  description: string;
  due_date: string;
  priority: 'high' | 'medium' | 'low';
  status: 'overdue' | 'pending' | 'in_progress' | 'done';
  assigned_to: string;
}

export interface Document {
  document_id: number;
  case_id: number;
  case_number: string;
  title: string;
  document_type: string;
  filed_date: string;
  filed_by: string;
}

export interface DecisionPrepNote {
  note_id: number;
  case_id: number;
  case_number: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  label: string;
}
