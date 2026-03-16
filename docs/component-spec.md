# Component Specification

## Vietnamese History Learning App

This document defines all UI components used in the application.

AI must follow these component specifications when generating UI.

Components must remain consistent across the entire project.

---

# 1. Button Component

Buttons are the primary interaction element.

## Style

```
border-radius: 12px
font-size: 18px
padding: 12px 20px
font-weight: 600
```

Minimum height

```
48px
```

---

## Button Variants

Primary Button

Used for:

- start lesson
- continue
- next slide

Style:

- bright color background
- white text

---

Secondary Button

Used for:

- back
- retry
- cancel

Style:

- light background
- colored text

---

Ghost Button

Used for:

- secondary actions
- subtle navigation

Style:

- no background
- colored text

---

# 2. Card Component

Cards are the main layout container.

Used for:

- lessons
- heroes
- quizzes
- events

---

## Card Style

```
border-radius: 16px
padding: 16px
background: white
box-shadow: soft shadow
```

Minimum height

```
120px
```

---

## Card Layout

```
Icon / Image
Title
Short description
```

Text must never exceed:

```
2 lines
```

---

# 3. LevelCard Component

Represents a learning level.

Used on the map screen.

---

## Layout

```
Icon
Level title
Short description
Status indicator
```

Example structure

```
[Icon]

Level 3
Battle of Bach Dang

🔓 Unlocked
```

---

## Level States

Unlocked

- normal color
- clickable

Locked

- greyed out
- lock icon

Completed

- checkmark icon
- highlight color

---

# 4. HeroCard Component

Displays a historical character.

---

## Layout

```
Hero Illustration

Hero Name
Hero Title

Achievement
```

Example

```
[Illustration]

Ngô Quyền
King of Vietnam

Victory at Bach Dang
```

---

## Hero States

Locked

- silhouette
- hidden information

Unlocked

- full illustration
- full text

Collected

- badge indicator

---

# 5. StorySlide Component

Used to display history stories.

---

## Layout

```
Illustration

Story text
```

Rules

Story text must be:

```
1–2 sentences
```

Maximum slides per lesson

```
5
```

Navigation buttons

```
Next
Back
```

---

# 6. QuizCard Component

Used for quizzes at the end of a lesson.

---

## Layout

```
Question text

Option 1
Option 2
Option 3
```

Options must be displayed as large buttons.

---

## Option States

Default

- neutral color

Selected

- highlight

Correct

- green

Incorrect

- red

---

# 7. ProgressBar Component

Shows lesson progress.

---

## Layout

```
[====------]

Lesson progress
```

---

## Rules

Progress must animate smoothly.

Animation duration

```
300ms
```

---

# 8. Badge Component

Represents achievements.

---

## Layout

```
Icon

Badge Title
```

Examples

```
History Explorer
Battle Master
Hero Collector
```

Badges must be colorful and visually rewarding.

---

# 9. MapNode Component

Represents a level on the learning map.

---

## Layout

```
Circle icon
Connection line
Level indicator
```

Example

```
● Level 1
 |
● Level 2
 |
● Level 3
```

---

# 10. Screen Structure

Every screen must follow this structure.

```
Header
Main Content
Action Button
```

Example

```
Title

Content

Continue Button
```

---

# 11. Component Consistency Rules

All components must:

- use the same spacing scale
- use the same color palette
- use the same animation rules
- use the same typography system

Never introduce new UI patterns without updating the design system.

---

# 12. Component Simplicity

Components must remain simple.

Avoid:

- complex logic inside UI
- nested UI complexity
- inconsistent styling

Components should focus only on presentation.

---

# 13. Naming Convention

Component names must follow this structure.

```
HeroCard
LevelCard
QuizCard
StorySlide
ProgressBar
Badge
```

Use PascalCase.

---

# 14. Reusability

Components must be reusable.

Avoid creating similar components with different names.

Example

Bad

```
LessonCard
HistoryCard
EventCard
```

Good

```
Card
```

with different props.

---

# 15. Interaction Consistency

All interactive components must follow the same behavior.

Hover

```
scale 1 → 1.05
```

Click

```
scale 1 → 0.95
```

Focus

```
highlight border
```
