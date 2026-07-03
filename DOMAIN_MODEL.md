# Domain Model MVP v1.0

## Архитектура системы

```
👤 User
    │
    ▼
🏠 Workshop
    │
 ┌──┴─────────────────────────────┐
 │                                │
 ▼                                ▼
🧵 Fabric                    📐 Pattern
 │                                │
 └──────────────┐      ┌──────────┘
                ▼      ▼
             👗 Project
                │
      ┌─────────┼──────────────┐
      ▼         ▼              ▼
 TimelineEvent 🛒 Shopping  AssistantMemory
                List
```

---

## Сущности

### 👤 User
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  plan VARCHAR(20) DEFAULT 'Free'
);
```

**Паспорт:**
- Швея, пользователь системы
- Создаётся при регистрации
- Изменяется при обновлении профиля
- Никогда не удаляется (архивируется)

---

### 🏠 Workshop
```sql
CREATE TABLE workshops (
  id UUID PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT DEFAULT 'Моя мастерская',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Паспорт:**
- Цифровая мастерская, контейнер всех данных
- Создаётся автоматически при регистрации
- Изменяется при обновлении названия/настроек
- Никогда не удаляется (вместе с User)

---

### 🧵 Fabric
```sql
CREATE TABLE fabrics (
  id UUID PRIMARY KEY,
  workshop_id UUID NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category VARCHAR(50),
  composition TEXT,
  width DECIMAL(5,2),
  color VARCHAR(100),
  print VARCHAR(100),
  supplier TEXT,
  purchase_price DECIMAL(10,2),
  purchase_date DATE,
  initial_length DECIMAL(5,2),
  current_length DECIMAL(5,2),
  location TEXT,
  status VARCHAR(20) DEFAULT 'новая',
  photo TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Паспорт:**
- Ткань, принадлежащая мастерской
- Создаётся при покупке/добавлении ткани
- Изменяется при использовании в проекте
- Никогда не удаляется (архивируется как "закончилась")

---

### 📐 Pattern
```sql
CREATE TABLE patterns (
  id UUID PRIMARY KEY,
  workshop_id UUID NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  author TEXT,
  type VARCHAR(50),
  size_range VARCHAR(100),
  file_pdf TEXT,
  photo TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Паспорт:**
- Выкройка, используется много раз
- Создаётся при добавлении выкройки
- Изменяется при обновлении информации
- Никогда не удаляется (архивируется)

---

### 👗 Project
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  workshop_id UUID NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category VARCHAR(50),
  status VARCHAR(20) DEFAULT 'Идея',
  created_at TIMESTAMP DEFAULT NOW(),
  finished_at TIMESTAMP,
  description TEXT,
  cover_photo TEXT
);
```

**Статусы:** Идея → Подготовка → В работе → Пауза → Готово

**Паспорт:**
- Изделие (платье, брюки и т.д.) - жизненный цикл от идеи до готовой вещи
- Создаётся когда швея решает шить новое изделие
- Изменяется постоянно
- Никогда не удаляется (архивируется как "готово")

---

### 🛍️ FabricUsage
```sql
CREATE TABLE fabric_usages (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  fabric_id UUID NOT NULL REFERENCES fabrics(id) ON DELETE CASCADE,
  used_length DECIMAL(5,2) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Паспорт:**
- Связь между тканью и проектом (сколько ткани использовано)
- Создаётся когда швея добавляет ткань к проекту
- Изменяется при пересчёте расхода
- Никогда не удаляется (историческая запись)

---

### 📋 PatternUsage
```sql
CREATE TABLE pattern_usages (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  pattern_id UUID NOT NULL REFERENCES patterns(id) ON DELETE CASCADE,
  version VARCHAR(20),
  changes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 📊 TimelineEvent
```sql
CREATE TABLE timeline_events (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Типы:**
- `photo` - фотография
- `note` - заметка
- `calculation` - расчёт
- `purchase` - покупка
- `edit` - изменение
- `status_change` - изменение статуса

**Паспорт:**
- События в истории проекта
- Создаётся при действиях пользователя
- Никогда не изменяется (историческая запись)
- Никогда не удаляется

---

### 🛒 ShoppingItem
```sql
CREATE TABLE shopping_items (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity DECIMAL(10,2),
  unit VARCHAR(20),
  price DECIMAL(10,2),
  is_bought BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 🤖 AssistantMemory
```sql
CREATE TABLE assistant_memory (
  id UUID PRIMARY KEY,
  workshop_id UUID UNIQUE NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  memory_json JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Паспорт:**
- Хранилище памяти помощника (пока одна JSON-запись)
- Создаётся при создании Workshop
- Изменяется после каждого завершённого проекта
- Никогда не удаляется

**Будет содержать:**
```json
{
  "favorite_fabrics": [],
  "favorite_patterns": [],
  "errors_history": [],
  "habits": {},
  "style": {},
  "completed_projects": []
}
```

---

## Связи

```
User (1) → (1) Workshop
Workshop (1) → (N) Fabrics
Workshop (1) → (N) Patterns
Workshop (1) → (N) Projects
Workshop (1) → (1) AssistantMemory

Project (1) → (N) TimelineEvents
Project (1) → (N) ShoppingItems
Project (N) ← (N) Fabrics (через FabricUsage)
Project (N) ← (N) Patterns (через PatternUsage)
```

---

## MVP Ограничения

✅ Включено:
- User + Workshop
- Fabric (независимая)
- Pattern (независимая)
- Project (центр системы)
- FabricUsage, PatternUsage
- TimelineEvent (фото + заметки + расчёты)
- ShoppingList
- AssistantMemory (пусто, готово к расширению)

❌ Исключено:
- Идеи
- Инструменты
- Остатки как отдельная сущность
- Коллективная база проектов
- Социальная сеть

---

## Принципы

1. **Проект = Процесс** - история создания изделия
2. **Ткань и выкройка = независимые** - живут сами по себе
3. **Timeline = все события** - фото, расчёты, заметки в одном месте
4. **AI Orchestrator везде** - не на отдельной странице
5. **Память растёт** - AssistantMemory готова к расширению
