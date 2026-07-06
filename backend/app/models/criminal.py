from datetime import date
from typing import List, Optional

from sqlalchemy import Integer, String, Date, ForeignKey, Boolean, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


class Offense(Base):
    __tablename__ = "offenses"
    
    offense_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    statute_code: Mapped[Optional[str]] = mapped_column(String)
    offense_name: Mapped[Optional[str]] = mapped_column(String)
    severity_level: Mapped[Optional[str]] = mapped_column(String)
    
    charges: Mapped[List["Charge"]] = relationship("Charge", back_populates="offense")


class Charge(Base):
    __tablename__ = "charges"
    
    charge_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    case_id: Mapped[Optional[int]] = mapped_column(ForeignKey("cases.case_id"))
    offense_id: Mapped[Optional[int]] = mapped_column(ForeignKey("offenses.offense_id"))
    charge_level: Mapped[Optional[str]] = mapped_column(String)
    filed_date: Mapped[Optional[date]] = mapped_column(Date)
    is_primary: Mapped[Optional[bool]] = mapped_column(Boolean)
    
    case: Mapped[Optional["Case"]] = relationship("Case", back_populates="charges")
    offense: Mapped[Optional["Offense"]] = relationship("Offense", back_populates="charges")
    pleas: Mapped[List["Plea"]] = relationship("Plea", back_populates="charge")
    dispositions: Mapped[List["Disposition"]] = relationship("Disposition", back_populates="charge")


class PleaType(Base):
    __tablename__ = "plea_type"
    
    plea_type_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    plea_name: Mapped[Optional[str]] = mapped_column(String)
    
    pleas: Mapped[List["Plea"]] = relationship("Plea", back_populates="plea_type")


class Plea(Base):
    __tablename__ = "pleas"
    
    plea_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    charge_id: Mapped[Optional[int]] = mapped_column(ForeignKey("charges.charge_id"))
    plea_type_id: Mapped[Optional[int]] = mapped_column(ForeignKey("plea_type.plea_type_id"))
    plea_date: Mapped[Optional[date]] = mapped_column(Date)
    
    charge: Mapped[Optional["Charge"]] = relationship("Charge", back_populates="pleas")
    plea_type: Mapped[Optional["PleaType"]] = relationship("PleaType", back_populates="pleas")


class Disposition(Base):
    __tablename__ = "dispositions"
    
    disposition_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    charge_id: Mapped[Optional[int]] = mapped_column(ForeignKey("charges.charge_id"))
    disposition_result: Mapped[Optional[str]] = mapped_column(String)
    disposition_date: Mapped[Optional[date]] = mapped_column(Date)
    
    charge: Mapped[Optional["Charge"]] = relationship("Charge", back_populates="dispositions")
    sentences: Mapped[List["Sentence"]] = relationship("Sentence", back_populates="disposition")


class Sentence(Base):
    __tablename__ = "sentences"
    
    sentence_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    disposition_id: Mapped[Optional[int]] = mapped_column(ForeignKey("dispositions.disposition_id"))
    jail_days: Mapped[Optional[int]] = mapped_column(Integer)
    probation_months: Mapped[Optional[int]] = mapped_column(Integer)
    fine_amount: Mapped[Optional[float]] = mapped_column(Numeric)
    community_service_hours: Mapped[Optional[int]] = mapped_column(Integer)
    
    disposition: Mapped[Optional["Disposition"]] = relationship("Disposition", back_populates="sentences")


class Warrant(Base):
    __tablename__ = "warrants"
    
    warrant_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    case_id: Mapped[Optional[int]] = mapped_column(ForeignKey("cases.case_id"))
    issue_date: Mapped[Optional[date]] = mapped_column(Date)
    warrant_type: Mapped[Optional[str]] = mapped_column(String)
    is_active: Mapped[Optional[bool]] = mapped_column(Boolean)
    
    case: Mapped[Optional["Case"]] = relationship("Case", back_populates="warrants")
