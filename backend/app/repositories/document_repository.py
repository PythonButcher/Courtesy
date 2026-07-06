from typing import List, Dict, Any, Optional
from abc import ABC, abstractmethod
from app.fixtures import get_documents_by_case

class DocumentRepository(ABC):
    @abstractmethod
    def get_by_case_id(self, case_id: int) -> List[Dict[str, Any]]:
        pass

class MockDocumentRepository(DocumentRepository):
    def get_by_case_id(self, case_id: int) -> List[Dict[str, Any]]:
        return get_documents_by_case(case_id)

class DBDocumentRepository(DocumentRepository):
    def __init__(self, session):
        self.session = session
        
    def get_by_case_id(self, case_id: int) -> List[Dict[str, Any]]:
        raise NotImplementedError("Database queries are not implemented yet.")
