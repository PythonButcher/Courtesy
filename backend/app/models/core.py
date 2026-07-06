from datetime import date, datetime
from typing import List, Optional

from sqlalchemy import Integer, String, Date, Text, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


class Court(Base):
    __tablename__ = "courts"
    
    court_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    court_name: Mapped[Optional[str]] = mapped_column(String)
    jurisdiction: Mapped[Optional[str]] = mapped_column(String)
    court_level: Mapped[Optional[str]] = mapped_column(String)
    
    judges: Mapped[List["Judge"]] = relationship("Judge", back_populates="court")
    cases: Mapped[List["Case"]] = relationship("Case", back_populates="court")


class Judge(Base):
    __tablename__ = "judges"
    
    judge_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    first_name: Mapped[Optional[str]] = mapped_column(String)
    last_name: Mapped[Optional[str]] = mapped_column(String)
    appointment_date: Mapped[Optional[date]] = mapped_column(Date)
    court_id: Mapped[Optional[int]] = mapped_column(ForeignKey("courts.court_id"))
    
    court: Mapped[Optional["Court"]] = relationship("Court", back_populates="judges")
    cases: Mapped[List["Case"]] = relationship("Case", back_populates="assigned_judge")


class CourtCaseType(Base):
    __tablename__ = "court_case_type"
    
    case_type_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    case_type_code: Mapped[Optional[str]] = mapped_column(String)
    description: Mapped[Optional[str]] = mapped_column(String)
    
    cases: Mapped[List["Case"]] = relationship("Case", back_populates="case_type")


class CaseStatus(Base):
    __tablename__ = "case_status"
    
    case_status_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    status_name: Mapped[Optional[str]] = mapped_column(String)
    
    cases: Mapped[List["Case"]] = relationship("Case", back_populates="case_status")


class Case(Base):
    __tablename__ = "cases"
    
    case_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    case_number: Mapped[Optional[str]] = mapped_column(String)
    case_type_id: Mapped[Optional[int]] = mapped_column(ForeignKey("court_case_type.case_type_id"))
    case_status_id: Mapped[Optional[int]] = mapped_column(ForeignKey("case_status.case_status_id"))
    filing_date: Mapped[Optional[date]] = mapped_column(Date)
    court_id: Mapped[Optional[int]] = mapped_column(ForeignKey("courts.court_id"))
    assigned_judge_id: Mapped[Optional[int]] = mapped_column(ForeignKey("judges.judge_id"))
    description: Mapped[Optional[str]] = mapped_column(Text)
    
    case_type: Mapped[Optional["CourtCaseType"]] = relationship("CourtCaseType", back_populates="cases")
    case_status: Mapped[Optional["CaseStatus"]] = relationship("CaseStatus", back_populates="cases")
    court: Mapped[Optional["Court"]] = relationship("Court", back_populates="cases")
    assigned_judge: Mapped[Optional["Judge"]] = relationship("Judge", back_populates="cases")
    
    parties: Mapped[List["CaseParty"]] = relationship("CaseParty", back_populates="case")
    hearings: Mapped[List["Hearing"]] = relationship("Hearing", back_populates="case")
    charges: Mapped[List["Charge"]] = relationship("Charge", back_populates="case")
    payments: Mapped[List["Payment"]] = relationship("Payment", back_populates="case")
    warrants: Mapped[List["Warrant"]] = relationship("Warrant", back_populates="case")


class Person(Base):
    __tablename__ = "people"
    
    person_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    first_name: Mapped[Optional[str]] = mapped_column(String)
    last_name: Mapped[Optional[str]] = mapped_column(String)
    date_of_birth: Mapped[Optional[date]] = mapped_column(Date)
    gender: Mapped[Optional[str]] = mapped_column(String)
    ssn_last4: Mapped[Optional[str]] = mapped_column(String(4))
    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime)
    
    case_parties: Mapped[List["CaseParty"]] = relationship("CaseParty", back_populates="person")


class CaseParty(Base):
    __tablename__ = "case_parties"
    
    case_party_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    case_id: Mapped[Optional[int]] = mapped_column(ForeignKey("cases.case_id"))
    person_id: Mapped[Optional[int]] = mapped_column(ForeignKey("people.person_id"))
    party_role: Mapped[Optional[str]] = mapped_column(String)
    
    case: Mapped[Optional["Case"]] = relationship("Case", back_populates="parties")
    person: Mapped[Optional["Person"]] = relationship("Person", back_populates="case_parties")


class Attorney(Base):
    __tablename__ = "attorneys"
    
    attorney_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    first_name: Mapped[Optional[str]] = mapped_column(String)
    last_name: Mapped[Optional[str]] = mapped_column(String)
    bar_number: Mapped[Optional[str]] = mapped_column(String)
    firm_name: Mapped[Optional[str]] = mapped_column(String)
    role: Mapped[Optional[str]] = mapped_column(String)


class Hearing(Base):
    __tablename__ = "hearings"
    
    hearing_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    case_id: Mapped[Optional[int]] = mapped_column(ForeignKey("cases.case_id"))
    hearing_type: Mapped[Optional[str]] = mapped_column(String)
    hearing_date: Mapped[Optional[date]] = mapped_column(Date)
    courtroom: Mapped[Optional[str]] = mapped_column(String)
    result_summary: Mapped[Optional[str]] = mapped_column(Text)
    
    case: Mapped[Optional["Case"]] = relationship("Case", back_populates="hearings")
