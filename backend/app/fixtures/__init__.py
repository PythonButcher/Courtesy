"""
Courtesy Backend – Mock Court Data Fixtures

All data here is fictional. No real people, case numbers, court records,
addresses, SSNs, or sensitive legal facts are included.

This fixture data aligns with the table structure in `Courtesy Postgres Schema.md`.
When PostgreSQL is connected, this module will be replaced by real database queries.
"""

# --- Courts ---
COURTS = [
    {
        "court_id": 1,
        "court_name": "Westbrook Superior Court",
        "jurisdiction": "Westbrook County",
        "court_level": "Superior",
    },
    {
        "court_id": 2,
        "court_name": "Eastfield Municipal Court",
        "jurisdiction": "Eastfield Township",
        "court_level": "Municipal",
    },
]

# --- Judges ---
JUDGES = [
    {
        "judge_id": 1,
        "first_name": "Margaret",
        "last_name": "Thornton",
        "appointment_date": "2018-03-15",
        "court_id": 1,
    },
    {
        "judge_id": 2,
        "first_name": "Robert",
        "last_name": "Castillo",
        "appointment_date": "2020-09-01",
        "court_id": 2,
    },
]

# --- Case Statuses ---
CASE_STATUSES = [
    {"case_status_id": 1, "status_name": "Active"},
    {"case_status_id": 2, "status_name": "Pending Review"},
    {"case_status_id": 3, "status_name": "Closed"},
    {"case_status_id": 4, "status_name": "Dismissed"},
]

# --- Case Types ---
CASE_TYPES = [
    {"case_type_id": 1, "case_type_code": "CV", "description": "Civil"},
    {"case_type_id": 2, "case_type_code": "CR", "description": "Criminal"},
    {"case_type_id": 3, "case_type_code": "FA", "description": "Family"},
    {"case_type_id": 4, "case_type_code": "PR", "description": "Probate"},
]

# --- Cases ---
CASES = [
    {
        "case_id": 1,
        "case_number": "2025-CV-00142",
        "case_type_id": 1,
        "case_type": "Civil",
        "case_status_id": 1,
        "status": "Active",
        "filing_date": "2025-01-15",
        "court_id": 1,
        "court_name": "Westbrook Superior Court",
        "assigned_judge_id": 1,
        "assigned_judge": "Hon. Margaret Thornton",
        "description": "Breach of commercial lease agreement — Plaintiff alleges failure to maintain property per lease terms, seeking damages and injunctive relief.",
        "parties": [
            {"name": "Greenfield Properties LLC", "role": "Plaintiff"},
            {"name": "Birchwood Retail Group", "role": "Defendant"},
        ],
    },
    {
        "case_id": 2,
        "case_number": "2025-CR-00087",
        "case_type_id": 2,
        "case_type": "Criminal",
        "case_status_id": 1,
        "status": "Active",
        "filing_date": "2025-02-03",
        "court_id": 2,
        "court_name": "Eastfield Municipal Court",
        "assigned_judge_id": 2,
        "assigned_judge": "Hon. Robert Castillo",
        "description": "Alleged misdemeanor theft from retail establishment. Defendant entered not-guilty plea.",
        "parties": [
            {"name": "State of Westbrook", "role": "Prosecution"},
            {"name": "Jordan M. Ellis", "role": "Defendant"},
        ],
    },
    {
        "case_id": 3,
        "case_number": "2024-FA-00331",
        "case_type_id": 3,
        "case_type": "Family",
        "case_status_id": 2,
        "status": "Pending Review",
        "filing_date": "2024-10-22",
        "court_id": 1,
        "court_name": "Westbrook Superior Court",
        "assigned_judge_id": 1,
        "assigned_judge": "Hon. Margaret Thornton",
        "description": "Petition for modification of custody arrangement. Both parties have submitted revised parenting plans for court review.",
        "parties": [
            {"name": "Taylor A. Reeves", "role": "Petitioner"},
            {"name": "Casey L. Reeves", "role": "Respondent"},
        ],
    },
    {
        "case_id": 4,
        "case_number": "2024-PR-00019",
        "case_type_id": 4,
        "case_type": "Probate",
        "case_status_id": 3,
        "status": "Closed",
        "filing_date": "2024-05-10",
        "court_id": 1,
        "court_name": "Westbrook Superior Court",
        "assigned_judge_id": 1,
        "assigned_judge": "Hon. Margaret Thornton",
        "description": "Administration of estate. All claims resolved, final accounting approved.",
        "parties": [
            {"name": "Estate of Marion P. Whitfield", "role": "Decedent Estate"},
            {"name": "Samantha K. Whitfield", "role": "Personal Representative"},
        ],
    },
]

# --- Hearings ---
HEARINGS = [
    {
        "hearing_id": 1,
        "case_id": 1,
        "case_number": "2025-CV-00142",
        "hearing_type": "Status Conference",
        "hearing_date": "2025-08-12",
        "courtroom": "Courtroom 3A",
        "result_summary": None,
    },
    {
        "hearing_id": 2,
        "case_id": 2,
        "case_number": "2025-CR-00087",
        "hearing_type": "Preliminary Hearing",
        "hearing_date": "2025-07-18",
        "courtroom": "Courtroom 1B",
        "result_summary": None,
    },
    {
        "hearing_id": 3,
        "case_id": 3,
        "case_number": "2024-FA-00331",
        "hearing_type": "Review Hearing",
        "hearing_date": "2025-07-25",
        "courtroom": "Courtroom 2A",
        "result_summary": None,
    },
    {
        "hearing_id": 4,
        "case_id": 1,
        "case_number": "2025-CV-00142",
        "hearing_type": "Motion Hearing",
        "hearing_date": "2025-03-20",
        "courtroom": "Courtroom 3A",
        "result_summary": "Motion to compel discovery granted. Defendant ordered to produce documents within 30 days.",
    },
]

# --- Tasks / Deadlines ---
TASKS = [
    {
        "task_id": 1,
        "case_id": 1,
        "case_number": "2025-CV-00142",
        "title": "File response to motion for summary judgment",
        "description": "Prepare and file opposition brief with supporting declarations.",
        "due_date": "2025-07-01",
        "priority": "high",
        "status": "overdue",
        "assigned_to": "Case Team",
    },
    {
        "task_id": 2,
        "case_id": 2,
        "case_number": "2025-CR-00087",
        "title": "Review discovery responses",
        "description": "Analyze prosecution discovery package for completeness and potential issues.",
        "due_date": "2025-07-20",
        "priority": "high",
        "status": "pending",
        "assigned_to": "Case Team",
    },
    {
        "task_id": 3,
        "case_id": 3,
        "case_number": "2024-FA-00331",
        "title": "Prepare revised parenting plan",
        "description": "Draft updated parenting plan incorporating mediator recommendations.",
        "due_date": "2025-07-15",
        "priority": "medium",
        "status": "in_progress",
        "assigned_to": "Case Team",
    },
    {
        "task_id": 4,
        "case_id": 1,
        "case_number": "2025-CV-00142",
        "title": "Organize exhibits for trial",
        "description": "Compile and index all exhibits for upcoming trial date.",
        "due_date": "2025-09-01",
        "priority": "medium",
        "status": "pending",
        "assigned_to": "Case Team",
    },
    {
        "task_id": 5,
        "case_id": 1,
        "case_number": "2025-CV-00142",
        "title": "Depose property manager",
        "description": "Schedule and conduct deposition of property management company representative.",
        "due_date": "2025-08-01",
        "priority": "high",
        "status": "pending",
        "assigned_to": "Case Team",
    },
]

# --- Documents ---
DOCUMENTS = [
    {
        "document_id": 1,
        "case_id": 1,
        "case_number": "2025-CV-00142",
        "title": "Complaint – Breach of Lease",
        "document_type": "Filing",
        "filed_date": "2025-01-15",
        "filed_by": "Greenfield Properties LLC",
    },
    {
        "document_id": 2,
        "case_id": 1,
        "case_number": "2025-CV-00142",
        "title": "Answer and Counterclaim",
        "document_type": "Filing",
        "filed_date": "2025-02-14",
        "filed_by": "Birchwood Retail Group",
    },
    {
        "document_id": 3,
        "case_id": 2,
        "case_number": "2025-CR-00087",
        "title": "Criminal Information",
        "document_type": "Filing",
        "filed_date": "2025-02-03",
        "filed_by": "State of Westbrook",
    },
    {
        "document_id": 4,
        "case_id": 1,
        "case_number": "2025-CV-00142",
        "title": "Motion to Compel Discovery",
        "document_type": "Motion",
        "filed_date": "2025-03-01",
        "filed_by": "Greenfield Properties LLC",
    },
]

# --- Decision-Prep Notes ---
DECISION_PREP_NOTES = [
    {
        "note_id": 1,
        "case_id": 1,
        "case_number": "2025-CV-00142",
        "title": "Lease Terms Analysis – Draft Research Aid",
        "content": (
            "Review of key lease provisions: Section 4.2 (maintenance obligations), "
            "Section 7.1 (remedies for breach), and Section 9.3 (termination clause). "
            "Cross-reference with property inspection reports from 2024-Q3 and Q4. "
            "Note: This is a draft preparation aid for case review, not a legal conclusion."
        ),
        "created_at": "2025-03-10T14:30:00Z",
        "updated_at": "2025-03-22T09:15:00Z",
        "label": "DRAFT RESEARCH AID",
    },
    {
        "note_id": 2,
        "case_id": 2,
        "case_number": "2025-CR-00087",
        "title": "Evidence Inventory – Preliminary Notes",
        "content": (
            "Catalog of disclosed evidence items: surveillance footage (3 clips), "
            "store inventory records, witness statements (2). "
            "Pending: store employee interview transcripts. "
            "Note: This is a preliminary preparation note, not a case assessment."
        ),
        "created_at": "2025-04-05T10:00:00Z",
        "updated_at": "2025-04-05T10:00:00Z",
        "label": "DRAFT RESEARCH AID",
    },
]


def get_all_cases():
    """Return all mock cases."""
    return CASES


def get_case_by_id(case_id: int):
    """Return a single case by ID, or None."""
    for case in CASES:
        if case["case_id"] == case_id:
            return case
    return None


def get_all_hearings():
    """Return all mock hearings."""
    return HEARINGS


def get_hearings_by_case(case_id: int):
    """Return hearings for a specific case."""
    return [h for h in HEARINGS if h["case_id"] == case_id]


def get_all_tasks():
    """Return all mock tasks."""
    return TASKS


def get_tasks_by_case(case_id: int):
    """Return tasks for a specific case."""
    return [t for t in TASKS if t["case_id"] == case_id]


def get_all_documents():
    """Return all mock documents."""
    return DOCUMENTS


def get_documents_by_case(case_id: int):
    """Return documents for a specific case."""
    return [d for d in DOCUMENTS if d["case_id"] == case_id]


def get_all_decision_prep_notes():
    """Return all mock decision-prep notes."""
    return DECISION_PREP_NOTES


def get_decision_prep_by_case(case_id: int):
    """Return decision-prep notes for a specific case."""
    return [n for n in DECISION_PREP_NOTES if n["case_id"] == case_id]
