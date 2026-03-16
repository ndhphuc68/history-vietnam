# AI Coding Rules

## Vietnamese History Learning App

This document defines coding rules for AI-generated code.

All generated code must follow these rules to maintain consistency and maintainability.

---

# 1. Project Philosophy

The project must be:

- simple
- maintainable
- modular
- mobile-first

Avoid complex architecture.

Prefer simple and readable code.

---

# 2. Technology Stack

Recommended stack:

Framework:

Next.js

Language:

TypeScript

Styling:

TailwindCSS

Animation:

Framer Motion

Icons:

Lucide Icons

---

# 3. Folder Structure

The project must follow this structure.

```
src/
  app/
  components/
  features/
  content/
  hooks/
  lib/
  styles/
```

Descriptions:

app

Next.js routes and pages.

components

Reusable UI components.

features

Feature-based modules.

content

Lesson and history data.

hooks

Reusable React hooks.

lib

Utility functions.

styles

Global styles.

---

# 4. Component Structure

Each component must follow this pattern.

```
ComponentName/
  ComponentName.tsx
  ComponentName.types.ts
  ComponentName.styles.ts
```

Example:

```
LevelCard/
  LevelCard.tsx
  LevelCard.types.ts
```

Rules:

- component must be small
- component must have a single responsibility

---

# 5. Component Naming

Use PascalCase.

Example:

```
HeroCard
LessonIntro
QuizOption
StorySlide
LevelMap
```

Avoid:

```
hero-card
lesson_intro
```

---

# 6. Props Rules

Props must be typed using TypeScript.

Example:

```
type HeroCardProps = {
  name: string
  title: string
  image: string
}
```

Avoid using `any`.

---

# 7. Component Size Rule

Components should be small.

Maximum:

200 lines

If component becomes large:

Split into smaller components.

---

# 8. Styling Rules

Use TailwindCSS.

Avoid:

inline styles

Example:

Good:

```
className="flex flex-col items-center gap-4"
```

Bad:

```
style={{ display: "flex" }}
```

---

# 9. Animation Rules

Use Framer Motion.

Example:

```
<motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.3 }}
>
```

Avoid custom animation libraries.

---

# 10. State Management

Use local state when possible.

Example:

React useState.

Avoid global state unless necessary.

If global state is needed:

Use Zustand.

Avoid Redux.

---

# 11. Content Management

Lessons must be stored in the content folder.

Example:

```
content/
  lessons/
    bach-dang.json
```

Content must follow the structure defined in:

content-structure.md

---

# 12. Data Fetching

Prefer static data.

Use static import when possible.

Example:

```
import lesson from "@/content/lessons/bach-dang.json"
```

Avoid unnecessary API calls.

---

# 13. Mobile First Design

All UI must be designed mobile-first.

Rules:

- large buttons
- readable text
- vertical layout

Avoid desktop-first layout.

---

# 14. Accessibility Rules

Components must support:

- keyboard navigation
- screen readers

Buttons must include labels.

---

# 15. Error Handling

Components must fail gracefully.

Example:

If image fails to load:

Show placeholder illustration.

Avoid crashing the UI.

---

# 16. Performance Rules

Optimize for performance.

Avoid:

- large bundles
- unnecessary re-renders

Use:

React memo
lazy loading

---

# 17. Reusability Rule

If a UI pattern appears more than twice:

Create a reusable component.

Examples:

Button
Card
Modal
Badge

---

# 18. Consistency Rule

All components must follow:

- same design system
- same animation rules
- same layout patterns

These rules are defined in:

ui-design-system.md
animation-patterns.md
layout-patterns.md

---

# 19. Code Style

Code must be:

- readable
- well structured
- formatted

Prefer descriptive variable names.

Example:

Good:

```
currentLesson
```

Bad:

```
data1
```

---

# 20. AI Generation Rules

When generating code:

AI must:

- follow folder structure
- follow UI rules
- follow interaction patterns
- follow animation rules

AI must not invent new patterns.

If unsure:

Follow existing components.
