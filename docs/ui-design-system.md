# UI Design System

## Vietnamese History Learning Web App (For Kids)

---

# 1. Design Goals

This application teaches Vietnamese history to children.

The UI must feel like:

- a game
- an interactive story
- a reward-based learning experience

The UI must NOT feel like:

- a textbook
- a traditional education website
- a blog

Core principles:

- playful
- colorful
- readable
- interactive
- simple

---

# 2. Design Philosophy

### Game-first UI

The interface should resemble a **mobile game UI**.

Prefer:

- cards
- icons
- animations
- progress indicators
- rewards

Avoid:

- large text blocks
- complex navigation
- dense layouts

---

### One Screen = One Idea

Each screen must communicate **one concept only**.

Good:

- show one historical event
- show one hero
- ask one quiz question

Bad:

- multiple explanations
- long content sections

---

# 3. Color System

The color palette must be **bright and friendly**.

### Primary colors

```
#FFD93D (Yellow)
#4D96FF (Blue)
#6BCB77 (Green)
```

### Secondary colors

```
#FF6B6B (Red)
#B983FF (Purple)
#FFA351 (Orange)
```

### Neutral colors

```
#FFFFFF
#F8F9FA
#E9ECEF
```

### Rules

Maximum colors per screen:

```
5
```

Avoid:

- dark backgrounds
- dull colors
- grayscale UI

---

# 4. Typography

Typography must be readable for children.

### Font style

Preferred:

- rounded sans-serif
- playful fonts

Example characteristics:

- soft edges
- wide letter spacing

---

### Font sizes

Heading 1

```
36px
```

Heading 2

```
32px
```

Heading 3

```
28px
```

Body text

```
20px
```

Minimum text size

```
18px
```

---

### Text rules

Maximum lines per paragraph

```
2
```

Maximum words per screen

```
40
```

Prefer:

- short sentences
- visual storytelling

---

# 5. Spacing System

Spacing must follow a consistent scale.

Spacing units

```
4px
8px
12px
16px
24px
32px
48px
64px
```

Rules

Use multiples of:

```
4px
```

Card padding

```
16px
```

Section spacing

```
32px
```

Page margin

```
24px
```

---

# 6. Layout System

The layout must be **mobile-first**.

### Container width

```
max-width: 1200px
```

### Layout structure

```
Header
Main Content
Footer
```

Preferred layout:

```
Vertical stacking
```

Avoid:

- complex grids
- horizontal scroll
- dense columns

---

# 7. Touch Targets

Children use touch devices.

Minimum sizes

Buttons

```
48px height
```

Cards

```
120px height
```

Clickable areas must be large and clear.

---

# 8. Component System

All UI must use reusable components.

Common components:

```
Button
Card
LevelCard
HeroCard
StorySlide
QuizCard
ProgressBar
Badge
```

---

# 9. Card Design

Cards are the primary UI element.

Card style

```
border-radius: 16px
padding: 16px
soft shadow
```

Card content:

```
icon
title
short text
```

Avoid:

- long descriptions
- dense layouts

---

# 10. Button Design

Buttons must be large and colorful.

Style

```
border-radius: 12px
padding: 12px 20px
font-size: 18px
```

Button states:

```
default
hover
active
disabled
```

Hover effect:

```
scale 1 → 1.05
```

Click effect:

```
scale 1 → 0.95
```

---

# 11. Icon System

Icons help reduce reading.

Examples:

⚔ battle
👑 king
🏆 victory
📜 event
⭐ achievement

Icons must always appear with labels.

---

# 12. Illustration Style

Illustrations must be:

- cartoon style
- colorful
- simple shapes
- friendly

Avoid:

- realistic historical paintings
- dark imagery

Children must feel safe and curious.

---

# 13. Animation System

Animations must feel playful and responsive.

### Duration

Fast interaction

```
150ms
```

Standard UI animation

```
200ms – 300ms
```

Large transition

```
300ms – 400ms
```

Maximum

```
500ms
```

---

# 14. Animation Types

Allowed animations

Fade

```
opacity 0 → 1
```

Scale

```
scale 0.9 → 1
```

Slide

```
translateY 20px → 0
```

Bounce

```
scale 1 → 1.05 → 1
```

---

# 15. Card Animation

When cards appear

```
opacity 0 → 1
scale 0.9 → 1
```

Duration

```
250ms
```

---

# 16. Quiz Feedback

Correct answer

```
green highlight
bounce animation
```

Incorrect answer

```
red highlight
shake animation
```

Shake example

```
translateX -4px → 4px → -2px → 0
```

---

# 17. Story Slide Animation

Slide transition

```
opacity 0 → 1
translateY 20px → 0
```

Duration

```
300ms
```

Only one animation per transition.

---

# 18. Progress Animation

Progress bars must animate smoothly.

Example

```
width 20% → 60%
```

Duration

```
300ms
```

---

# 19. Hero Unlock Animation

When a hero unlocks:

Steps

1 card appears
2 scale animation
3 glow effect

Animation

```
opacity 0 → 1
scale 0.8 → 1
```

Duration

```
400ms
```

---

# 20. Responsive Rules

Mobile-first design.

Breakpoints

```
mobile 320px
tablet 768px
desktop 1024px
```

Rules

- no horizontal scrolling
- components stack vertically

---

# 21. Performance Rules

UI must remain lightweight.

Preferred:

```
SVG icons
CSS transform
opacity animation
```

Avoid:

```
heavy animation libraries
layout animations
large images
```

Target performance

```
First load < 2s
```

---

# 22. Accessibility

Even though the app targets children, accessibility is required.

Rules:

- minimum font size 18px
- high contrast text
- large touch targets
- simple navigation

---

# 23. Code Style

UI must be component-based.

Preferred structure

```
components/
  Button
  Card
  HeroCard
  LevelCard
  StorySlide
  QuizCard
  ProgressBar
```

Components must be reusable and simple.

---

# 24. Overall Experience

The experience must feel like:

- a game
- a story
- a reward system

Children should feel:

- curiosity
- excitement
- discovery

The UI should encourage children to explore more history.
