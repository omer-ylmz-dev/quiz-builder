# Quiz Builder App 🎓

Create and manage custom quizzes with multiple question types.

---

## 🧱 Tech Stack

- **Backend:** Express.js + Sequelize + PostgreSQL
- **Frontend:** React + TypeScript + Tailwind CSS
- **Forms:** React Hook Form + Zod

---

## ⚙️ Setup

### 1. Clone the repo

```
bash
git clone https://github.com/omer-ylmz-dev/quiz-builder.git
cd quiz-builder
```


### 2. Backend Setup
#### 2.1 Install Dependencies
```
bash
cd backend
npm install
```

#### 2.2 Set Up Environment Variables

Edit the .env file to match your local PostgreSQL settings:
```
ini
DB_NAME=quizdb
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
PORT=5000
```

#### 2.3 Set Up Database
##### Option 1: Seed Database Manually

Run the following script to seed the database with an example quiz:

```
bash
npm run seed
```

##### Option 2: Automatically Sync Database

The app will automatically sync the database upon starting. This will create the necessary tables and relationships in your PostgreSQL database.

#### 2.4 Start Backend

```
bash
npm run dev
```

The backend will be running at http://localhost:5000.



### 3. Frontend Setup
##### 3.1 Install Dependencies

```
bash
cd frontend
npm install
```

##### 3.2 Set Up Environment Variables

Edit the .env file and make sure the API base URL is correctly set:

```
ini
VITE_API_BASE_URL=http://localhost:5000
```

##### 3.3 Start Frontend

```
bash
npm run dev
```

The frontend will be running at http://localhost:3000.

📂 Folder Structure

quiz-builder/
├── backend/
│   ├── src/
│   ├── models/
│   └── seed.ts
├── frontend/
│   ├── src/pages/
│   ├── components/
│   └── types/


🧪 Features

Create quiz with:

Boolean (True/False)

Input (Short Answer)

Checkbox (Multiple Answers)

View all quizzes

View single quiz details

Delete quiz


##  Author
Built by omer-ylmz-dev
