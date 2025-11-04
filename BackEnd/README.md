
פרויקט Node.js עם Express ו-Sequelize לניהול פגישות של קבוצות פיתוח.


- Node.js (גרסה 18 ומעלה)
- MySQL (או Docker עם MySQL)
- npm או yarn

### התקנת תלויות

```bash
cd BackEnd
npm install
```

### הגדרת מסד נתונים

עדכן את `config/default.json` עם פרטי החיבור למסד הנתונים:

```json
{
    "db": {
        "host": "localhost",
        "port": 3309,
        "username": "root",
        "password": "",
        "database": "schedule_management"
    }
}
```

### הרצת השרת

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

השרת יעלה על פורט 3000 (או לפי ההגדרה ב-config).


החזרת כל קבוצות הפיתוח שבחברה.

**Response:**
```json
[
  {
    "team_code": "uuid",
    "team_name": "Team UI",
    "created_at": "2024-01-15T10:00:00.000Z",
    "updated_at": "2024-01-15T10:00:00.000Z"
  }
]
```

החזרת כל הפגישות של קבוצת פיתוח ספציפית לפי קוד קבוצת פיתוח.

**Parameters:**
- `teamCode` (UUID) - קוד קבוצת הפיתוח

**Response:**
```json
[
  {
    "meeting_code": "uuid",
    "team_code": "uuid",
    "start_datetime": "2024-01-20T10:00:00.000Z",
    "end_datetime": "2024-01-20T11:30:00.000Z",
    "description": "Team meeting",
    "room_name": "Blue Room",
    "created_at": "2024-01-15T10:00:00.000Z",
    "updated_at": "2024-01-15T10:00:00.000Z",
    "team": {
      "team_code": "uuid",
      "team_name": "Team UI"
    }
  }
]
```

### 3. POST /meetings
הוספת פגישה חדשה.

**Request Body:**
```json
{
  "team_code": "uuid",
  "start_datetime": "2024-01-20T10:00:00",
  "end_datetime": "2024-01-20T11:30:00",
  "description": "Team meeting description",
  "room_name": "Blue Room"
}
```

**Required Fields:**
- `team_code` (UUID) - קוד קבוצת הפיתוח
- `start_datetime` (ISO 8601 datetime) - תאריך ושעת התחלת הפגישה
- `end_datetime` (ISO 8601 datetime) - תאריך ושעת סיום הפגישה
- `room_name` (string) - שם החדר

**Optional Fields:**
- `description` (string) - תיאור הפגישה

**Response:**
```json
{
  "meeting_code": "uuid",
  "team_code": "uuid",
  "start_datetime": "2024-01-20T10:00:00.000Z",
  "end_datetime": "2024-01-20T11:30:00.000Z",
  "description": "Team meeting description",
  "room_name": "Blue Room",
  "created_at": "2024-01-15T10:00:00.000Z",
  "updated_at": "2024-01-15T10:00:00.000Z"
}
```

## בדיקה עם Postman

1. ייבא את קובץ `postman_collection.json` ל-Postman
2. הגדר את המשתנה `baseUrl` ל-`http://localhost:3000`
3. הרץ את ה-requests

## Docker

### הרצה עם Docker Compose

```bash
docker-compose up backend
```

השרת יעלה על פורט 3020 (מיפוי ל-3000 בתוך הקונטיינר).

## מבנה הפרויקט

```