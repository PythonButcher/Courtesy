from .case_repository import CaseRepository, MockCaseRepository, DBCaseRepository
from .hearing_repository import HearingRepository, MockHearingRepository, DBHearingRepository
from .task_repository import TaskRepository, MockTaskRepository, DBTaskRepository
from .document_repository import DocumentRepository, MockDocumentRepository, DBDocumentRepository
from .decision_prep_repository import DecisionPrepRepository, MockDecisionPrepRepository, DBDecisionPrepRepository
from app.database import get_db_session

def get_repository(repo_class):
    """
    Factory function to get the appropriate repository implementation.
    Phase 2: Always returns MockRepository. DB is scaffolded, inactive, mock-first.
    """
    mapping = {
        CaseRepository: MockCaseRepository,
        HearingRepository: MockHearingRepository,
        TaskRepository: MockTaskRepository,
        DocumentRepository: MockDocumentRepository,
        DecisionPrepRepository: MockDecisionPrepRepository,
    }
    
    mock_class = mapping.get(repo_class)
    
    if not mock_class:
        raise ValueError(f"Unknown repository interface: {repo_class}")
        
    return mock_class()
