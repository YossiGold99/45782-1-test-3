# Schedule Management - Database Setup Guide

## סעיף 1: יצירת מסד הנתונים MySQL

### א. יצירת מסד הנתונים דרך phpMyAdmin

1. פתח את phpMyAdmin בדפדפן (לרוב: `http://localhost:8080` או `http://localhost/phpmyadmin`)

2. לחץ על הלשונית "SQL" בתפריט העליון

3. העתק את התוכן מקובץ `DataBase/schedule_management.sql` והדבק בחלון ה-SQL

4. לחץ על "Go" או "הפעל" כדי לבצע את השאילתה

5. מסד הנתונים `schedule_management` ייווצר עם הטבלאות הבאות:
   - **development_teams** - טבלת קבוצות הפיתוח (עם UUID כמפתח ראשי)
   - **meetings** - טבלת פגישות (עם UUID כמפתח ראשי)

### ב. יצירת מסד הנתונים דרך Docker

אם אתה משתמש ב-Docker, מסד הנתונים ייווצר אוטומטית בעת הרצת:

```bash
docker-compose up database
```

הקובץ `schedule_management.sql` יבוצע אוטומטית בעת יצירת הקונטיינר.

### ג. מבנה הטבלאות

#### טבלת development_teams (קבוצות פיתוח):
- `team_code` (CHAR(36)) - מפתח ראשי, UUID
- `team_name` (VARCHAR(255)) - שם קבוצת הפיתוח

#### טבלת meetings (פגישות):
- `meeting_code` (CHAR(36)) - מפתח ראשי, UUID
- `team_code` (CHAR(36)) - מפתח זר לטבלת development_teams
- `start_datetime` (DATETIME) - תאריך ושעת התחלת הפגישה
- `end_datetime` (DATETIME) - תאריך ושעת סיום הפגישה
- `description` (TEXT) - תיאור הפגישה
- `room_name` (VARCHAR(255)) - שם החדר

### ד. נתונים לדוגמה

הקובץ כולל נתונים לדוגמה:
- 5 קבוצות פיתוח: Team UI, Team Mobile, Team React, Team Backend, Team DevOps
- 6 פגישות לדוגמה

ניתן להוסיף עוד רשומות דרך ממשק phpMyAdmin לאחר יצירת הטבלאות.

### ה. חיבור למסד הנתונים

פרטי החיבור:
- **Host**: localhost (או שם הקונטיינר `schedule-management-db-compose` אם משתמשים ב-Docker)
- **Port**: 3309 (אם משתמשים ב-Docker) או 3306 (אם MySQL מותקן מקומית)
- **Database**: schedule_management
- **Username**: root
- **Password**: (ריק)
