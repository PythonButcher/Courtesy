from typing import List, Dict, Any, Optional
from abc import ABC, abstractmethod
from app.fixtures import get_decision_prep_by_case

class DecisionPrepRepository(ABC):
    @abstractmethod
    def get_by_case_id(self, case_id: int) -> List[Dict[str, Any]]:
        pass

class MockDecisionPrepRepository(DecisionPrepRepository):
    def get_by_case_id(self, case_id: int) -> List[Dict[str, Any]]:
        return get_decision_prep_by_case(case_id)

class DBDecisionPrepRepository(DecisionPrepRepository):
    def __init__(self, session):
        self.session = session
        
    def get_by_case_id(self, case_id: int) -> List[Dict[str, Any]]:
        raise NotImplementedError("Database queries are not implemented yet.")
