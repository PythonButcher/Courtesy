from typing import List, Dict, Any, Optional
from abc import ABC, abstractmethod
from app.fixtures import get_all_hearings, get_hearings_by_case

class HearingRepository(ABC):
    @abstractmethod
    def get_all(self, case_id: Optional[int] = None) -> List[Dict[str, Any]]:
        pass
        
    @abstractmethod
    def get_by_case_id(self, case_id: int) -> List[Dict[str, Any]]:
        pass

class MockHearingRepository(HearingRepository):
    def get_all(self, case_id: Optional[int] = None) -> List[Dict[str, Any]]:
        if case_id:
            return self.get_by_case_id(case_id)
        return get_all_hearings()
        
    def get_by_case_id(self, case_id: int) -> List[Dict[str, Any]]:
        return get_hearings_by_case(case_id)

class DBHearingRepository(HearingRepository):
    def __init__(self, session):
        self.session = session
        
    def get_all(self, case_id: Optional[int] = None) -> List[Dict[str, Any]]:
        raise NotImplementedError("Database queries are not implemented yet.")
        
    def get_by_case_id(self, case_id: int) -> List[Dict[str, Any]]:
        raise NotImplementedError("Database queries are not implemented yet.")
