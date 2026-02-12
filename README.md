## EMR Dashboard – Electronic Medical Records System

### 🔗 Live Demo

- **Frontend (Netlify)**: [`https://emr-medical-dashboard.netlify.app/`](https://emr-medical-dashboard.netlify.app/)
- **Backend API (Render)**: [`https://emr-dashboard-backend.onrender.com`](https://emr-dashboard-backend.onrender.com)
- **Backend Repository**: [`https://github.com/sllawwkoo/emr-dashboard-backend`](https://github.com/sllawwkoo/emr-dashboard-backend)

> ⚠️ **Note**: The backend is hosted on Render free tier, so the first request after inactivity may be slow due to cold start.

---

### 📌 About the Project

EMR Dashboard is an administrative web application for managing **patients**, **doctors**, and **appointments** in a medical practice.  
It is designed as a realistic, production-style dashboard with responsive UI, dark/light themes, and data-driven analytics.

---

### ✅ Features

- **Patients CRUD** – create, view, edit, and delete patients
- **Doctors CRUD** – manage doctors, specializations, and contact info
- **Appointments CRUD** – schedule, update, and cancel appointments
- **Status management** – `scheduled`, `active`, `completed` states for appointments
- **Dashboard statistics** – summary cards, status overview, upcoming appointments, doctors load, recent completed
- **Dark / Light theme** – theme toggle with token-based theming
- **Responsive design** – optimized for desktop, tablet, and mobile
- **RTK Query data normalization** – efficient data access via normalized entities

---

### 🛠 Tech Stack

#### Frontend

- **React** (SPA, functional components, hooks)
- **Vite** (fast dev server and build tooling)
- **Redux Toolkit** (global state management)
- **RTK Query** (data fetching, caching, normalized entities)
- **React Hook Form** (form state and validation wiring)
- **Yup** (validation schemas via `@hookform/resolvers/yup`)
- **SCSS Modules** (localized styles, design tokens, responsive mixins)

#### Backend

- **Node.js**
- **Express**
- **REST API** for patients, doctors, and appointments
- Deployed on **Render**

---

### 🧩 Architecture Overview

- **RTK Query + Entity Adapter**
  - The API slice uses normalized responses where possible (`ids` + `entities`).
  - Lists and detail views consume the same cached data without duplicating requests.
  - Mapping helpers (e.g. ID → `fullName`) are derived from normalized entities.

- **Normalized State**
  - Patients and doctors are stored in a normalized shape, enabling:
    - O(1) lookup by ID
    - Easy cross-entity joins (appointments → patient/doctor names)
    - Predictable cache updates after mutations

- **Component-based Architecture**
  - Reusable UI components for inputs, layout, loaders, modals, and page headers.
  - Feature-specific components under `pages/...` (e.g. Dashboard widgets).

- **Modular Folder Structure**
  - Clear separation of concerns:
    - `api` for data access
    - `components` for shared UI
    - `pages` for route-level screens
    - `routes` for front-end routing config
    - `assets` for styles and static assets

---

### 📁 Project Structure (Frontend)

```bash
src/
  api/
    index.js                # RTK Query API slice (patients, doctors, appointments)
  assets/
    styles/
      _variables.scss       # design tokens (light/dark theme)
      _mixins.scss          # adaptiveValue, toRem, etc.
      _reset.scss
      style.scss            # global entry styles
  components/
    HeaderPage/
    Loader/
    Modal/
    Pagination/
    SearchInput/
    # ...other shared UI components
  pages/
    DashboardPage/
      index.jsx
      DashboardPage.module.scss
      components/
        SummaryCard/
        StatusOverview/
        UpcomingList/
        DoctorsLoad/
        RecentCompleted/
    Patients/
      PatientsPage/
      PatientsForm/
      utils/
      constants/
    Doctors/
      DoctorsPage/
      DoctorsForm/
      utils/
      constants/
    Appointments/
      AppointmentsPage/
      AppointmentsForm/
      components/
      utils/
      constants/
    Page404/
  routes/
    frontRoutes.js          # route paths and navigation helpers
  utils/
    pageHeaders.config.js   # titles/descriptions for pages
main.jsx
vite.config.js
```

### 📁 Backend Structure (High-Level)

_Backend lives in a separate repository: `emr-dashboard-backend`._

```bash
emr-dashboard-backend/
  controllers/
    appointmentsController.js
    doctorsController.js
    patientsController.js
  routes/
    appointments.js
    doctors.js
    patients.js
  data/
    appointments.json
    doctors.json
    patients.json
  utils/
    fileHandler.js
  app.js
  server.js
  package.json
```

---

### 🚀 Installation & Local Development

#### Frontend (this repo)

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

The app will be available at something like `http://localhost:5173/` (Vite default, may vary).

#### Backend (separate repo)

```bash
git clone https://github.com/sllawwkoo/emr-dashboard-backend.git
cd emr-dashboard-backend

# Install dependencies
npm install

# Run dev server
npm start
```

By default the backend listens on its configured port (see backend README for environment variables and details).

---

### 🔮 Future Improvements

- Role-based access control (admin / doctor / receptionist)
- Authentication & authorization (JWT or session-based)
- Audit logs for critical operations (e.g. deleting records)
- Advanced filtering and analytics on the dashboard
- i18n support for switching languages at runtime

---

### 👤 Author

- **Viacheslav** – [GitHub Profile](https://github.com/sllawwkoo)

---

---

## EMR Dashboard – Система електронних медичних записів

### 🔗 Live Demo

- **Фронтенд (Netlify)**: [`https://emr-medical-dashboard.netlify.app/`](https://emr-medical-dashboard.netlify.app/)
- **Backend API (Render)**: [`https://emr-dashboard-backend.onrender.com`](https://emr-dashboard-backend.onrender.com)
- **Репозиторій бекенда**: [`https://github.com/sllawwkoo/emr-dashboard-backend`](https://github.com/sllawwkoo/emr-dashboard-backend)

> ⚠️ **Увага**: Бекенд розгорнутий на безкоштовному тарифі Render, тому перший запит після простою може виконуватися повільніше (cold start).

---

### 📌 Про проєкт

EMR Dashboard — це адміністративний веб-додаток для керування **пацієнтами**, **лікарями** та **прийомами** (appointments).  
Дашборд спроєктований максимально наближеним до production-рішень: адаптивна верстка, темна/світла тема, аналітика та зручна навігація.

---

### ✅ Можливості

- **CRUD пацієнтів** – створення, перегляд, редагування, видалення пацієнтів
- **CRUD лікарів** – управління лікарями, спеціалізаціями та контактами
- **CRUD прийомів** – планування, оновлення та скасування прийомів
- **Керування статусами** – стани прийому: `scheduled`, `active`, `completed`
- **Статистика на дашборді** – summary-картки, статус-огляд, найближчі прийоми, завантаження лікарів, останні завершені прийоми
- **Темна / світла тема** – перемикач теми на основі design tokens
- **Адаптивний дизайн** – зручна робота на десктопі, планшеті та мобільних пристроях
- **Нормалізація даних через RTK Query** – ефективна робота з кешем та сутностями

---

### 🛠 Технологічний стек

#### Фронтенд

- **React** (SPA, функціональні компоненти, hooks)
- **Vite** (швидкий dev-сервер та збірка)
- **Redux Toolkit** (глобальний стан)
- **RTK Query** (запити, кешування, нормалізовані сутності)
- **React Hook Form** (управління станом форм)
- **Yup** (схеми валідації через `@hookform/resolvers/yup`)
- **SCSS Modules** (модульні стилі, токени дизайну, міксини для адаптиву)

#### Бекенд

- **Node.js**
- **Express**
- **REST API** для пацієнтів, лікарів і прийомів
- Деплой на **Render**

---

### 🧩 Огляд архітектури

- **RTK Query + Entity Adapter**
  - API-слайс повертає нормалізовані дані (`ids` + `entities`), де це можливо.
  - Списки та детальні сторінки використовують один і той самий кеш.
  - Допоміжні мапи (наприклад, ID → `fullName`) будуються з нормалізованих сутностей.

- **Нормалізований стан**
  - Пацієнти та лікарі зберігаються у нормалізованому вигляді:
    - O(1) доступ до сутності за ID
    - Просте з’єднання даних (прийоми → ім’я пацієнта / лікаря)
    - Прогнозована поведінка кешу після мутацій

- **Компонентний підхід**
  - Переиспользувані UI-компоненти: інпути, хедери сторінок, модалки, списки, лоадери.
  - Функціональні блоки зосереджені в `pages/...` (наприклад, віджети дашборду).

- **Модульна структура**
  - Чітка ізоляція відповідальностей:
    - `api` — робота з даними
    - `components` — спільні UI-компоненти
    - `pages` — сторінки / маршрути
    - `routes` — конфігурація роутінгу
    - `assets` — стилі та статичні ресурси

---

### 📁 Структура проєкту (Фронтенд)

```bash
src/
  api/
    index.js                # RTK Query API-слайс (пацієнти, лікарі, прийоми)
  assets/
    styles/
      _variables.scss       # дизайн-токени (світла/темна тема)
      _mixins.scss          # adaptiveValue, toRem тощо
      _reset.scss
      style.scss            # вхідна точка глобальних стилів
  components/
    HeaderPage/
    Loader/
    Modal/
    Pagination/
    SearchInput/
    # ...інші спільні UI-компоненти
  pages/
    DashboardPage/
      index.jsx
      DashboardPage.module.scss
      components/
        SummaryCard/
        StatusOverview/
        UpcomingList/
        DoctorsLoad/
        RecentCompleted/
    Patients/
      PatientsPage/
      PatientsForm/
      utils/
      constants/
    Doctors/
      DoctorsPage/
      DoctorsForm/
      utils/
      constants/
    Appointments/
      AppointmentsPage/
      AppointmentsForm/
      components/
      utils/
      constants/
    Page404/
  routes/
    frontRoutes.js          # шляхи та хелпери навігації
  utils/
    pageHeaders.config.js   # заголовки та описи сторінок
main.jsx
vite.config.js
```

### 📁 Структура бекенда (загальний вигляд)

_Бекенд знаходиться в окремому репозиторії: `emr-dashboard-backend`._

```bash
emr-dashboard-backend/
  controllers/
    appointmentsController.js
    doctorsController.js
    patientsController.js
  routes/
    appointments.js
    doctors.js
    patients.js
  data/
    appointments.json
    doctors.json
    patients.json
  utils/
    fileHandler.js
  app.js
  server.js
  package.json
```

---

### 🚀 Встановлення та запуск локально

#### Фронтенд (цей репозиторій)

```bash
# Встановити залежності
npm install

# Запустити dev-сервер
npm run dev
```

Додаток буде доступний на `http://localhost:5173/` (за замовчуванням Vite, може відрізнятися).

#### Бекенд (окремий репозиторій)

```bash
git clone https://github.com/sllawwkoo/emr-dashboard-backend.git
cd emr-dashboard-backend

# Встановити залежності
npm install

# Запустити dev-сервер
npm run dev
```

За замовчуванням бекенд слухає порт, описаний у README бекенда / змінних оточення.

---

### 🔮 Подальші покращення

- Розмежування доступів (рольова модель: admin / doctor / receptionist)
- Аутентифікація та авторизація (JWT або session-based)
- Audit log для критичних операцій (видалення, оновлення важливих даних)
- Розширена аналітика та фільтрація на дашборді
- Повноцінна i18n для перемикання мов у UI

---

### 👤 Автор

- **Viacheslav** – [GitHub профіль](https://github.com/sllawwkoo)

