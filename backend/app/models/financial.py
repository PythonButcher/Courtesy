from datetime import date
from typing import Optional

from sqlalchemy import Integer, String, Date, ForeignKey, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


class Payment(Base):
    __tablename__ = "payments"
    
    payment_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    case_id: Mapped[Optional[int]] = mapped_column(ForeignKey("cases.case_id"))
    payment_date: Mapped[Optional[date]] = mapped_column(Date)
    amount: Mapped[Optional[float]] = mapped_column(Numeric)
    payment_method: Mapped[Optional[str]] = mapped_column(String)
    
    case: Mapped[Optional["Case"]] = relationship("Case", back_populates="payments")
