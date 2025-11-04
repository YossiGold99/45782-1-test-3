# Schedule Management - Frontend

## סעיף 3: Frontend React Application

אפליקציית React לניהול פגישות של קבוצות פיתוח.

## התקנה והרצה

### דרישות מוקדמות
- Node.js (גרסה 18 ומעלה)
- npm או yarn

### התקנת תלויות

```bash
cd FrontEnd/FrontEnd
npm install
```

### הגדרת משתנה סביבה

צור קובץ `.env` בתיקיית `FrontEnd/FrontEnd`:

```env
VITE_API_URL=http://localhost:3020
```

### הרצת השרת

**Development mode:**
```bash
npm run dev
```

האפליקציה תהיה זמינה ב-`http://localhost:5173`

**Production build:**
```bash
npm run build
npm run preview
```

## תכונות

- ✅ תיבת Select להצגת כל קבוצות הפיתוח
- ✅ הצגת פגישות לפי קבוצה נבחרת (כרטיסיות)
- ✅ טופס להוספת פגישה חדשה עם כל השדות הנדרשים
- ✅ עיצוב מודרני ואסתטי
- ✅ תמיכה בעברית (RTL)
- ✅ Responsive design

## מבנה הפרויקט

```
FrontEnd/FrontEnd/
├── src/
│   ├── services/
│   │   └── api.ts          # API service לקריאות ל-Backend
│   ├── App.tsx             # קומפוננטה ראשית
│   ├── App.css             # עיצוב
│   └── main.tsx            # נקודת כניסה
├── public/
└── package.json
```

## שימוש

1. בחר קבוצת פיתוח מתיבת ה-Select
2. צפה בפגישות של הקבוצה שנבחרה
3. לחץ על "הוסף פגישה חדשה" כדי להוסיף פגישה
4. מלא את כל השדות הנדרשים ושמור
