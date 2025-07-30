
Проект для управления автозапчастями с иерархией (деталь → поддеталь).  
Поддерживает **добавление, удаление, пересчёт цен**, а также **экспорт** в Excel и PDF.

---

## ✨ Функционал
- ✅ CRUD операций для деталей (с поддержкой родителя)
- ✅ Автоматический пересчёт цен родительских деталей
- ✅ Каскадное удаление (удаляются все дочерние элементы)
- ✅ Экспорт данных в Excel и PDF
- ✅ Frontend (Vue 3) + Backend (Express + TypeORM + PostgreSQL)

---

## 🛠️ Технологии
- **Backend:** Node.js, Express, TypeScript, TypeORM, PostgreSQL
- **Frontend:** Vue 3, Vite, Axios
- **Экспорт:** ExcelJS, PDFKit

---

## 🚀 Запуск проекта

### 1. Клонирование репозитория
```bash
git clone https://github.com/gabitii/draft_csi
cd car-parts-manager
```

### 2. Установка зависимостей
#### Backend:
```bash
npm install
```

#### Frontend:
```bash
cd car-parts-frontend
npm install
```

### 3. Настройка базы данных
1. Создать PostgreSQL базу (например, `draft_db`)
2. В `.env` указать параметры подключения:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_password
DB_NAME=draft_db
```

---

### 4. Запуск сервера
```bash
npm run dev
```

---

### 5. Запуск фронтенда
```bash
cd car-parts-frontend
npm run dev
```
По умолчанию будет доступен на:  
👉 **http://localhost:5173**

---

## 📂 API Роуты
| Метод | Роут             | Описание                     |
|--------|------------------|-----------------------------|
| GET    | `/parts`         | Получить все детали         |
| POST   | `/parts`         | Добавить деталь             |
| DELETE | `/parts/:id`     | Удалить деталь по ID        |
| DELETE | `/parts/clear`   | Удалить все детали          |
| GET    | `/parts/export`  | Скачать экспорт (Excel/PDF) |

---

## 📝 Автор
**Gabit Sagindykov**  
