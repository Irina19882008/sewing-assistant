# Структура проекта

```
sewing-assistant/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Главная страница (гость)
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── callback/page.tsx
│   │   ├── calculator/
│   │   │   └── fabric-usage/page.tsx  # Калькулятор расхода ткани
│   │   ├── workshop/              # Защищённые маршруты
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           # Главная мастерской
│   │   │   ├── project/
│   │   │   │   ├── [id]/page.tsx  # Карточка изделия
│   │   │   │   ├── [id]/edit.tsx
│   │   │   │   └── new/page.tsx   # Создать изделие
│   │   │   └── settings/page.tsx
│   │   └── api/
│   │       ├── projects/route.ts
│   │       ├── fabrics/route.ts
│   │       ├── patterns/route.ts
│   │       ├── timeline/route.ts
│   │       └── shopping/route.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── forms/
│   │   │   ├── FabricForm.tsx
│   │   │   ├── ProjectForm.tsx
│   │   │   └── CalculatorForm.tsx
│   │   ├── cards/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── FabricCard.tsx
│   │   │   └── TimelineEventCard.tsx
│   │   ├── calculator/
│   │   │   ├── FabricUsageCalculator.tsx
│   │   │   ├── DensityCalculator.tsx
│   │   │   └── CostCalculator.tsx
│   │   └── ai/
│   │       ├── AssistantButton.tsx
│   │       └── AssistantChat.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # Supabase клиент
│   │   │   ├── auth.ts
│   │   │   └── queries.ts       # SQL запросы
│   │   ├── api/
│   │   │   └── claude.ts        # Claude API integration
│   │   ├── types/
│   │   │   ├── user.ts
│   │   │   ├── project.ts
│   │   │   ├── fabric.ts
│   │   │   └── timeline.ts
│   │   └── utils/
│   │       ├── validators.ts
│   │       └── calculations.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useProject.ts
│   │   ├── useFabric.ts
│   │   └── useAssistant.ts
│   │
│   ├── store/
│   │   ├── authStore.ts        # Zustand
│   │   ├── projectStore.ts
│   │   └── assistantStore.ts
│   │
│   └── styles/
│       ├── globals.css
│       └── variables.css
│
├── public/
│   ├── images/
│   └── icons/
│
├── docs/
│   ├── DOMAIN_MODEL.md
│   ├── API.md
│   └── USER_JOURNEYS.md
│
├── .gitignore
├── .env.example
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## Слои архитектуры

### 1. Presentation Layer (`src/components/`, `src/app/`)
- React компоненты
- Next.js страницы
- UI элементы

### 2. Business Logic Layer (`src/lib/`, `src/hooks/`)
- Валидация
- Расчёты
- Бизнес правила

### 3. API Layer (`src/app/api/`, `src/lib/api/`)
- REST endpoints
- Claude API интеграция
- Supabase queries

### 4. Data Layer (`src/lib/supabase/`)
- Supabase клиент
- Database queries
- Authentication

### 5. State Management (`src/store/`)
- Zustand stores
- Global state
- User context

---

## Путь разработки

1. **Главная страница (гость)** - 7 экранов Journey #1
2. **Авторизация** - Supabase Auth
3. **Калькулятор расхода ткани** - первый UI компонент
4. **Результат расчёта** - вывод данных
5. **Создание мастерской** - регистрация
6. **Создание первого изделия** - первый Project
7. **Карточка изделия** - отображение данных
8. **AI Orchestrator** - Claude API интеграция

---

## Суть для Cursor

Используй эту структуру при генерации компонентов:
- Создавай компоненты в `src/components/`
- Создавай типы в `src/lib/types/`
- Создавай хуки в `src/hooks/`
- Используй Tailwind для стилей
- Интегрируй с Supabase через `src/lib/supabase/`
