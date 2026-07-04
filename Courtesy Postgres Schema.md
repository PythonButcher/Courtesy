# Court Postgres Schema

## I. Table Definitions

### Table: attorneys

- **attorney_id**: integer (Primary Key)

- **first_name**: character varying

- **last_name**: character varying

- **bar_number**: character varying

- **firm_name**: character varying

- **role**: character varying

### Table: case_parties

- **case_party_id**: integer (Primary Key)

- **case_id**: integer (Foreign Key to cases)

- **person_id**: integer (Foreign Key to people)

- **party_role**: character varying

### Table: case_status

- **case_status_id**: integer (Primary Key)

- **status_name**: character varying

### Table: cases

- **case_id**: integer (Primary Key)

- **case_number**: character varying

- **case_type_id**: integer (Foreign Key to court_case_type)

- **case_status_id**: integer (Foreign Key to case_status)

- **filing_date**: date

- **court_id**: integer (Foreign Key to courts)

- **assigned_judge_id**: integer (Foreign Key to judges)

- **description**: text

### Table: charges

- **charge_id**: integer (Primary Key)

- **case_id**: integer (Foreign Key to cases)

- **offense_id**: integer (Foreign Key to offenses)

- **charge_level**: character varying

- **filed_date**: date

- **is_primary**: boolean

### Table: court_case_type

- **case_type_id**: integer (Primary Key)

- **case_type_code**: character varying

- **description**: character varying

### Table: courts

- **court_id**: integer (Primary Key)

- **court_name**: character varying

- **jurisdiction**: character varying

- **court_level**: character varying

### Table: dispositions

- **disposition_id**: integer (Primary Key)

- **charge_id**: integer (Foreign Key to charges)

- **disposition_result**: character varying

- **disposition_date**: date

### Table: hearings

- **hearing_id**: integer (Primary Key)

- **case_id**: integer (Foreign Key to cases)

- **hearing_type**: character varying

- **hearing_date**: date

- **courtroom**: character varying

- **result_summary**: text

### Table: judges

- **judge_id**: integer (Primary Key)

- **first_name**: character varying

- **last_name**: character varying

- **appointment_date**: date

- **court_id**: integer (Foreign Key to courts)

### Table: offenses

- **offense_id**: integer (Primary Key)

- **statute_code**: character varying

- **offense_name**: character varying

- **severity_level**: character varying

### Table: payments

- **payment_id**: integer (Primary Key)

- **case_id**: integer (Foreign Key to cases)

- **payment_date**: date

- **amount**: numeric

- **payment_method**: character varying

### Table: people

- **person_id**: integer (Primary Key)

- **first_name**: character varying

- **last_name**: character varying

- **date_of_birth**: date

- **gender**: character varying

- **ssn_last4**: character

- **created_at**: timestamp without time zone

### Table: plea_type

- **plea_type_id**: integer (Primary Key)

- **plea_name**: character varying

### Table: pleas

- **plea_id**: integer (Primary Key)

- **charge_id**: integer (Foreign Key to charges)

- **plea_type_id**: integer (Foreign Key to plea_type)

- **plea_date**: date

### Table: sentences

- **sentence_id**: integer (Primary Key)

- **disposition_id**: integer (Foreign Key to dispositions)

- **jail_days**: integer

- **probation_months**: integer

- **fine_amount**: numeric

- **community_service_hours**: integer

### Table: vw_case_summary (View)

- **case_number**: character varying

- **case_type**: character varying

- **status_name**: character varying

- **filing_date**: date

- **total_charges**: bigint

### Table: warrants

- **warrant_id**: integer (Primary Key)

- **case_id**: integer (Foreign Key to cases)

- **issue_date**: date

- **warrant_type**: character varying

- **is_active**: boolean

## II. Foreign Key Constraints

| Local Table | Local Column | References Table | References Column |
| --- | --- | --- | --- |
| judges | court_id | courts | court_id |
| cases | case_type_id | court_case_type | case_type_id |
| cases | case_status_id | case_status | case_status_id |
| cases | court_id | courts | court_id |
| cases | assigned_judge_id | judges | judge_id |
| case_parties | case_id | cases | case_id |
| case_parties | person_id | people | person_id |
| charges | case_id | cases | case_id |
| charges | offense_id | offenses | offense_id |
| pleas | charge_id | charges | charge_id |
| pleas | plea_type_id | plea_type | plea_type_id |
| dispositions | charge_id | charges | charge_id |
| hearings | case_id | cases | case_id |
| sentences | disposition_id | dispositions | disposition_id |
| payments | case_id | cases | case_id |
| warrants | case_id | cases | case_id |

