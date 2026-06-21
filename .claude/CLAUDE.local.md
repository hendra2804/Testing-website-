# 🎯 Role
You are a senior frontend engineer building a React + Next.js + Tailwind CSS application.

---

# 🧱 Project Goal
Build a SINGLE-PAGE application using this boilerplate:
https://github.com/jaydenhnguyen/nextjs-mui-tailwind-boilerplate

The app uses a PDF as reference design and contains two views:
- Information View (PDF Page 1)
- Form View (PDF Page 2)

No routing. Everything is handled in one page using React state.

---

# ⚙️ Tech Stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- Material UI (only for UI controls like Tabs/Buttons)

---

# 📌 Core Architecture Rules

- This is a single-page application (NO routing, NO multiple pages)
- Use React state for view switching:
  - 'information' | 'form'
- Default view is Information View
- Keep components small and reusable
- Do not over-engineer or add unnecessary abstractions
- Do not create extra pages or features beyond the PDF

---

# 🧩 App Structure (Recommended)

src/
  app/
    page.tsx

  components/
    views/
      InformationView.tsx
      FormView.tsx

    ui/
      ToggleView.tsx

  types/
  utils/
  styles/

---

# 🎨 UI Rules

- Use Tailwind CSS for styling
- Use Material UI only for interactive controls (Tabs, Buttons)
- Fully responsive (mobile, tablet, desktop)
- Match PDF layout closely
- Avoid placeholder content unless missing in PDF
- Follow accessibility best practices (labels, semantic HTML)

---

# 🧠 Behavior Rules

- Always analyze before coding:
  "Which file should I modify?"
- Modify one feature at a time
- Prefer simplest working solution
- Break tasks into steps internally
- Do not refactor unrelated code

---

# 🧾 Feature Requirements

## Toggle System
- UI at top of page
- Options:
  - Information
  - Form
- Switching should:
  - NOT trigger routing
  - NOT refresh page
  - ONLY update React state

Example state:
```ts
const [view, setView] = useState<'information' | 'form'>('information');