# 🧵 Sewing Assistant

AI-powered digital workshop for seamstresses.

A web application that helps seamstresses manage their sewing projects, track fabrics, calculate material costs, and receive AI-assisted guidance throughout their creative journey.

---

## 🎯 Mission

**Not projects. Not modules. Real value.**

We built Sewing Assistant around one principle: *Don't ask users to invest in the system until the system has invested in them.*

Users get immediate value (fabric calculations) before creating an account. Only then does the magic happen—their digital workshop opens.

---

## 🏗️ Architecture

### MVP Scope
- ✅ Guest calculator (fabric usage, density, cost)
- ✅ User authentication (Supabase)
- ✅ Digital workshop (owner's space)
- ✅ Projects (sewing journey from idea to finished garment)
- ✅ Fabrics & Patterns (independent, reusable)
- ✅ Timeline (unified project history: photos, notes, calculations)
- ✅ Shopping list
- ✅ AI Orchestrator (Claude integration)

### Out of Scope (v2+)
- Ideas management
- Tools inventory
- Social features
- Fabric scraps marketplace
- Collective project base

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Next.js 14 |
| Backend | Supabase (PostgreSQL) |
| Auth | Supabase Auth + OAuth |
| AI | Claude API |
| State | Zustand |
| Styling | Tailwind CSS |
| Development | Cursor + Claude Code + GitHub |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- GitHub account
- Supabase account
- Claude API key

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Irina19882008/sewing-assistant.git
cd sewing-assistant
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Fill in your:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `CLAUDE_API_KEY`

4. **Setup Supabase**
```bash
# Run migrations (schema setup)
# See DOMAIN_MODEL.md for SQL scripts
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📚 Documentation

- **[Domain Model](./DOMAIN_MODEL.md)** - Database schema and entities
- **[Project Structure](./PROJECT_STRUCTURE.md)** - Folder organization
- **[User Journeys](./USER_JOURNEYS.md)** - MVP user flows (8 screens)

---

## 🎬 MVP User Journey

**"From fabric calculator to first project"**

```
1. 🏠 Guest homepage → "Calculate fabric usage"
2. 📐 Calculator → Step-by-step questions
3. 📊 Result → "Save to workshop?"
4. 🎉 Motivation → "Create workshop"
5. 👤 Registration → Google/Apple/Email
6. 🏠 Workshop created → "Create first project?"
7. 📝 Name project → "Summer dress"
8. 👗 Project card → Calculation already attached ✨
```

**That's it. One complete journey. MVP done.**

---

## 🤖 AI Orchestrator

The AI doesn't live on a separate page.

It lives **everywhere**, contextually:

```
🧵 Fabric card    → "🤖 Ask assistant"
👗 Project card   → "🤖 What's next?"
🛒 Shopping list  → "🤖 Review list"
📐 Pattern        → "🤖 Suggest changes"
```

---

## 📊 Database

**7 core entities for MVP:**

```
User → Workshop → {Fabrics, Patterns, Projects}
                  Project → {TimelineEvent, ShoppingList}
```

---

## 🧪 Testing MVP

1. **Run the app**
2. **Complete Journey #1** (8 screens)
3. **Invite 5-10 real seamstresses**
4. **Collect feedback**
5. **Iterate** (not rebuild, iterate)

---

## 🎓 Design Principles

1. **Solve real problems** - Not features, solutions
2. **Timeline over lists** - History > static data
3. **AI everywhere** - Not a chatbot, a way of interaction
4. **Value first** - User gets benefit before login
5. **One journey deep** - Better to go 8 screens deep than 20 screens wide

---

## 📄 License

MIT License

---

## 🚧 Current Status

- [x] Philosophy & planning
- [x] Domain model (v1.0)
- [x] User journeys (Journey #1)
- [ ] Database schema setup
- [ ] Frontend screens (Cursor)
- [ ] Backend API (Supabase)
- [ ] AI integration (Claude)
- [ ] MVP release
- [ ] User testing

---

**Built with ❤️ by Ирина**

*Help seamstresses sew better.*
