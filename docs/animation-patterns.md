# Animation Patterns

## Vietnamese History Learning App

This document defines animation patterns used throughout the application.

Animations must follow these patterns to maintain consistency.

Animations should feel:

- playful
- fast
- responsive

Avoid heavy animations.

---

# 1. Animation Principles

Animations must:

- provide feedback
- guide user attention
- make the UI feel alive

Animations must never block interaction.

Rules:

- short duration
- smooth transitions
- consistent easing

---

# 2. Animation Duration

Standard durations:

Fast interaction

150ms

UI transition

200ms – 300ms

Reward animation

300ms – 400ms

Maximum duration

500ms

---

# 3. Animation Easing

Preferred easing functions:

ease-out

ease-in-out

Avoid:

linear

---

# 4. Page Transition Animation

When navigating between screens.

Animation:

opacity 0 → 1
translateY 20px → 0

Duration:

300ms

---

# 5. Card Appear Animation

Used when cards enter the screen.

Animation:

opacity 0 → 1
scale 0.9 → 1

Duration:

250ms

---

# 6. Button Interaction Animation

Hover:

scale 1 → 1.05

Click:

scale 1 → 0.95

Release:

scale 0.95 → 1

Duration:

150ms

---

# 7. Story Slide Animation

Slide transition:

opacity 0 → 1
translateY 20px → 0

Duration:

300ms

Only one animation should occur at a time.

---

# 8. Quiz Success Animation

When the user answers correctly.

Effects:

- bounce animation
- green highlight

Animation example:

scale 1 → 1.05 → 1

Duration:

250ms

Optional:

sparkle effect

---

# 9. Quiz Error Animation

When the user selects the wrong answer.

Animation:

translateX -4px → 4px → -2px → 0

Duration:

200ms

Color feedback:

red highlight

---

# 10. Hero Unlock Animation

Hero unlock should feel rewarding.

Sequence:

Hero card appears
Card scales up
Glow effect

Animation:

opacity 0 → 1
scale 0.8 → 1

Duration:

400ms

---

# 11. Progress Bar Animation

Progress bar must animate smoothly.

Example:

width 20% → 60%

Duration:

300ms

---

# 12. Level Unlock Animation

When a new level unlocks.

Animation:

scale 0.9 → 1.1 → 1

Optional:

small sparkle effect

Duration:

350ms

---

# 13. Map Node Interaction

Tap level node.

Unlocked node:

scale 1 → 1.1

Locked node:

small shake animation

---

# 14. Animation Performance Rules

Animations must use:

transform
opacity

Avoid animating:

width
height
margin

Prefer GPU-friendly animations.

---

# 15. Animation Consistency

All animations must follow:

- same duration ranges
- same easing
- same interaction patterns

Do not introduce new animation styles without updating this document.
