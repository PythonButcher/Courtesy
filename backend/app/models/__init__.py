"""
Courtesy Backend – Domain Models (Placeholder)

These are placeholder model classes that mirror the PostgreSQL schema
documented in `Courtesy Postgres Schema.md`. They are NOT connected to
a database in this starter slice.

When PostgreSQL is connected, these will become proper SQLAlchemy 2.x
mapped classes using DeclarativeBase.
"""

# TODO: Convert to SQLAlchemy 2.x models when database is connected.
#
# from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
# from sqlalchemy import String, Integer, Date, Text, Boolean, Numeric, ForeignKey
#
# class Base(DeclarativeBase):
#     pass
#
# class Court(Base):
#     __tablename__ = "courts"
#     court_id: Mapped[int] = mapped_column(Integer, primary_key=True)
#     court_name: Mapped[str] = mapped_column(String)
#     jurisdiction: Mapped[str] = mapped_column(String)
#     court_level: Mapped[str] = mapped_column(String)
#
# class Judge(Base):
#     __tablename__ = "judges"
#     judge_id: Mapped[int] = mapped_column(Integer, primary_key=True)
#     first_name: Mapped[str] = mapped_column(String)
#     last_name: Mapped[str] = mapped_column(String)
#     appointment_date: Mapped[date] = mapped_column(Date)
#     court_id: Mapped[int] = mapped_column(ForeignKey("courts.court_id"))
#
# class Case(Base):
#     __tablename__ = "cases"
#     case_id: Mapped[int] = mapped_column(Integer, primary_key=True)
#     case_number: Mapped[str] = mapped_column(String)
#     case_type_id: Mapped[int] = mapped_column(ForeignKey("court_case_type.case_type_id"))
#     case_status_id: Mapped[int] = mapped_column(ForeignKey("case_status.case_status_id"))
#     filing_date: Mapped[date] = mapped_column(Date)
#     court_id: Mapped[int] = mapped_column(ForeignKey("courts.court_id"))
#     assigned_judge_id: Mapped[int] = mapped_column(ForeignKey("judges.judge_id"))
#     description: Mapped[str] = mapped_column(Text)
#
# ... (hearings, charges, people, attorneys, etc.)
#
# See `Courtesy Postgres Schema.md` for the full table list.
