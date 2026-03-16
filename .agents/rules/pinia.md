---
trigger: always_on
---

# Pinia Rules

All global state must use Pinia.

Stores must be placed inside:

stores/

Example store structure:

stores/
progressStore.ts
heroStore.ts
lessonStore.ts

Rules:

- Use defineStore
- Keep stores small
- Separate logic into composables if complex
