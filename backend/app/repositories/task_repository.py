from typing import List, Dict, Any, Optional
from abc import ABC, abstractmethod
from app.fixtures import get_all_tasks, get_tasks_by_case

class TaskRepository(ABC):
    @abstractmethod
    def get_all(self, case_id: Optional[int] = None) -> List[Dict[str, Any]]:
        pass
        
    @abstractmethod
    def get_by_case_id(self, case_id: int) -> List[Dict[str, Any]]:
        pass

class MockTaskRepository(TaskRepository):
    def get_all(self, case_id: Optional[int] = None) -> List[Dict[str, Any]]:
        if case_id:
            return self.get_by_case_id(case_id)
        return get_all_tasks()
        
    def get_by_case_id(self, case_id: int) -> List[Dict[str, Any]]:
        return get_tasks_by_case(case_id)

class DBTaskRepository(TaskRepository):
    def __init__(self, session):
        self.session = session
        
    def get_all(self, case_id: Optional[int] = None) -> List[Dict[str, Any]]:
        raise NotImplementedError("Database queries are not implemented yet.")
        
    def get_by_case_id(self, case_id: int) -> List[Dict[str, Any]]:
        raise NotImplementedError("Database queries are not implemented yet.")
