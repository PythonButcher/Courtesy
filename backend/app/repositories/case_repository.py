from typing import List, Dict, Any, Optional
from abc import ABC, abstractmethod
from app.fixtures import get_all_cases, get_case_by_id

class CaseRepository(ABC):
    @abstractmethod
    def get_all(self, status: Optional[str] = None, case_type: Optional[str] = None) -> List[Dict[str, Any]]:
        pass
        
    @abstractmethod
    def get_by_id(self, case_id: int) -> Optional[Dict[str, Any]]:
        pass

class MockCaseRepository(CaseRepository):
    def get_all(self, status: Optional[str] = None, case_type: Optional[str] = None) -> List[Dict[str, Any]]:
        cases = get_all_cases()
        if status:
            cases = [c for c in cases if c["status"].lower() == status.lower()]
        if case_type:
            cases = [c for c in cases if c["case_type"].lower() == case_type.lower()]
        return cases
        
    def get_by_id(self, case_id: int) -> Optional[Dict[str, Any]]:
        return get_case_by_id(case_id)

class DBCaseRepository(CaseRepository):
    def __init__(self, session):
        self.session = session
        
    def get_all(self, status: Optional[str] = None, case_type: Optional[str] = None) -> List[Dict[str, Any]]:
        raise NotImplementedError("Database queries are not implemented yet.")
        
    def get_by_id(self, case_id: int) -> Optional[Dict[str, Any]]:
        raise NotImplementedError("Database queries are not implemented yet.")
