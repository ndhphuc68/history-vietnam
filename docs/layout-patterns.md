# Layout Patterns

## Vietnamese History Learning App

This document defines layout structures used across the application.

AI must follow these patterns when generating pages.

Layouts must remain consistent across the entire app.

---

# 1. Global Page Layout

Every page must follow this structure.

```
Header
Main Content
Primary Action Area
```

Example structure:

```
[Header]

[Main Content]

[Primary Button]
```

Rules:

- main content must be centered
- avoid multi-column layouts
- use vertical stacking

---

# 2. Map Screen Layout

The map screen is the main navigation of the app.

Purpose:

- show learning progress
- show available levels

---

## Layout

```
Title

Map Path

Level Nodes
```

Example:

```
Vietnam History Journey

● Level 1
 |
● Level 2
 |
● Level 3
```

Rules:

- levels must appear in vertical progression
- completed levels should show a check icon
- locked levels should show a lock icon

---

# 3. Lesson Intro Layout

Purpose:

Introduce the historical event or hero.

---

## Layout

```
Hero Illustration

Lesson Title

Short Description

Start Button
```

Example:

```
[Illustration]

Battle of Bach Dang

Ngô Quyền defeated the Southern Han fleet.

[Start Lesson]
```

Rules:

- illustration must be large
- description must be short
- start button must be visible immediately

---

# 4. Story Slide Layout

Used to tell historical stories.

---

## Layout

```
Illustration

Story Text

Next Button
```

Example:

```
[Illustration]

The Southern Han army invaded Vietnam.

[Next]
```

Rules:

- illustration must occupy most of the screen
- story text must be short
- navigation must be clear

---

# 5. Quiz Screen Layout

Used after a lesson.

---

## Layout

```
Question

Option Button
Option Button
Option Button
```

Example:

```
Who defeated the Southern Han army?

[Ngô Quyền]

[Trần Hưng Đạo]

[Lý Thái Tổ]
```

Rules:

- options must be large buttons
- options must be stacked vertically
- immediate feedback must be provided

---

# 6. Quiz Result Layout

Displays whether the answer is correct.

---

## Layout

```
Result Icon

Result Text

Continue Button
```

Example:

```
🎉 Correct!

Ngô Quyền won the Battle of Bach Dang.

[Continue]
```

Rules:

- result must be visually clear
- positive feedback must feel rewarding

---

# 7. Hero Unlock Layout

Used when a hero card is unlocked.

---

## Layout

```
Hero Card

Hero Name

Achievement

Continue Button
```

Example:

```
[Hero Illustration]

Ngô Quyền

Victory at Bach Dang

[Continue]
```

Rules:

- hero card must appear prominently
- animation should emphasize reward

---

# 8. Hero Collection Layout

Shows all collected heroes.

---

## Layout

```
Page Title

Hero Grid
```

Example:

```
Heroes

[HeroCard] [HeroCard]

[HeroCard] [HeroCard]
```

Rules:

- use grid layout
- show locked heroes as silhouettes

---

# 9. Progress Screen Layout

Shows learning progress.

---

## Layout

```
Title

Progress Bar

Stats

Continue Button
```

Example:

```
Your Progress

[Progress Bar]

Lessons completed: 6

[Continue Learning]
```

Rules:

- progress must be visually clear
- avoid text-heavy statistics

---

# 10. Navigation Rules

Navigation must be simple.

Allowed navigation types:

- back button
- next button
- level selection

Avoid:

- deep navigation trees
- complex menus

---

# 11. Mobile Layout Rules

The app must be designed mobile-first.

Rules:

- content width must fit small screens
- large touch targets
- vertical scrolling preferred

Avoid:

- horizontal scrolling
- complex grids

---

# 12. Empty State Layout

Used when no content is available.

---

## Layout

```
Illustration

Message

Action Button
```

Example:

```
📜

No heroes unlocked yet.

[Start Learning]
```

Rules:

- empty states must feel friendly
- always provide an action

```

```
