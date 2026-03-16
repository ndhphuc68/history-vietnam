# Interaction Patterns

## Vietnamese History Learning App

This document defines interaction behaviors across the application.

AI must follow these patterns when implementing UI interactions.

Interactions must remain consistent throughout the application.

---

# 1. Interaction Philosophy

The application should feel:

- responsive
- playful
- simple

Interactions must provide **immediate feedback**.

Users must always understand:

- what just happened
- what they should do next

---

# 2. Button Interaction

All buttons must follow the same interaction pattern.

## Hover

```
scale: 1 → 1.05
duration: 150ms
```

## Click

```
scale: 1 → 0.95
duration: 100ms
```

## Release

```
scale: 0.95 → 1
duration: 100ms
```

Rules:

- buttons must feel responsive
- animations must be fast

---

# 3. Navigation Interaction

Navigation must always be clear.

Allowed navigation actions:

- next
- back
- start lesson
- continue

Avoid:

- complex menu navigation
- deep navigation levels

---

# 4. Lesson Start Flow

User opens a lesson.

Interaction flow:

```
Click LevelCard
↓
Open Lesson Intro Screen
↓
User clicks Start
↓
Story Slide begins
```

Lesson intro screen must include:

- illustration
- lesson title
- start button

---

# 5. Story Slide Interaction

Story slides must feel like flipping pages in a storybook.

User actions:

```
Next
Back
```

Slide transition:

```
fade + slide
duration: 300ms
```

Rules:

- slides must change smoothly
- user must always see navigation buttons

---

# 6. Quiz Interaction

Each lesson ends with one quiz.

Interaction flow:

```
User selects option
↓
System checks answer
↓
Feedback animation plays
↓
Continue button appears
```

---

## Quiz States

Option default

- neutral color

Option selected

- highlight color

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

---

# 7. Quiz Retry Interaction

If the user selects the wrong answer:

```
Show incorrect feedback
↓
Allow retry
```

Rules:

- user should not feel punished
- retry should be easy

---

# 8. Quiz Success Flow

When the correct answer is selected:

```
Success animation
↓
Show explanation
↓
Continue button
```

Example explanation:

```
Correct!

Ngô Quyền defeated the Southern Han fleet.
```

---

# 9. Level Completion Flow

When a lesson ends:

```
Lesson complete
↓
Show success screen
↓
Unlock hero (optional)
↓
Continue button
```

Success screen must feel rewarding.

---

# 10. Hero Unlock Interaction

When a hero is unlocked:

```
Hero card appears
↓
Card scales up
↓
Glow effect
↓
Show hero information
```

Animation duration:

```
400ms
```

Rules:

- reward moment must feel special
- hero card must be centered

---

# 11. Progress Update

After completing a lesson:

```
Progress bar updates
```

Animation:

```
width transition
duration: 300ms
```

Rules:

- progress must feel satisfying
- animation must be smooth

---

# 12. Map Interaction

Map nodes represent levels.

User actions:

```
tap level
```

Possible results:

Unlocked level

```
open lesson intro
```

Locked level

```
show lock animation
```

Completed level

```
show check icon
```

---

# 13. Locked Level Interaction

If a level is locked:

Interaction feedback:

```
small shake animation
```

Display message:

```
Complete previous level to unlock
```

---

# 14. Hero Collection Interaction

User opens hero collection screen.

Actions:

```
tap hero card
```

Unlocked hero

```
show hero details
```

Locked hero

```
show silhouette
```

---

# 15. Progress Feedback

The system should celebrate progress.

Examples:

- small confetti
- sparkle effect
- badge unlock

These effects must be lightweight.

---

# 16. Error Handling Interaction

If something fails:

Display a friendly message.

Example:

```
Something went wrong.
Please try again.
```

Rules:

- avoid technical language
- keep messages simple

---

# 17. Interaction Timing

Interaction feedback must be fast.

Maximum delay before feedback:

```
100ms
```

Users should never wonder if the UI responded.

---

# 18. Consistency Rules

All interactive elements must follow:

- the same animation system
- the same feedback patterns
- the same button behaviors

Do not introduce new interaction patterns without updating this document.

---

# 19. Accessibility Interaction

Ensure interactions work for all users.

Rules:

- large buttons
- visible focus states
- clear feedback

Avoid interactions that rely only on color.

---

# 20. Interaction Simplicity

Interactions must remain simple.

Avoid:

- multi-step gestures
- hidden interactions
- complex controls

Children must understand interactions instantly.
