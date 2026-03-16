You are a senior frontend architect.

Your task is to build a scalable lesson system for a history learning website for children.

The website teaches Vietnamese history through interactive lessons.

---

TECH STACK

Nuxt 3
TypeScript
TailwindCSS
Pinia

Use Vue 3 Composition API with script setup.

---

PROJECT GOAL

The application should allow children to learn history through slides.

Each lesson contains:

story slides
quiz slides

Lessons are stored as JSON files.

---

CONTENT STRUCTURE

Lessons are stored in:

content/lessons/

Example:

content/lessons/van-lang.json

Example structure:

{
"id": "van-lang",
"title": "Thời đại Vua Hùng",
"summary": "Các vua Hùng lập nên nước Văn Lang.",
"slides": [
{
"type": "story",
"text": "Cách đây hàng nghìn năm..."
},
{
"type": "quiz",
"question": "Ai là vua đầu tiên?",
"options": ["Hùng Vương","Ngô Quyền","Lê Lợi"],
"answer": "Hùng Vương"
}
]
}

---

LESSON FLOW

A lesson should follow this flow:

Intro
Story slides
Quiz slide
Completion screen

---

ROUTING

Lessons are accessed by route:

/lesson/[id]

Example:

/lesson/van-lang

---

PAGE RESPONSIBILITY

The lesson page must:

load lesson JSON dynamically
render slides sequentially
track current slide index
show next button
handle quiz interaction
show completion screen

---

SLIDE TYPES

Supported slide types:

story
quiz

Use dynamic component rendering.

Example:

<component :is="slideComponent" :slide="slide" />

---

UI DESIGN

The UI must be child-friendly.

Use:

large fonts
rounded cards
bright colors
big spacing

Layout:

centered card
full screen lesson view
mobile first

---

ANIMATION RULES

Slide transitions:

horizontal slide animation
300ms duration

Buttons:

hover scale
tap feedback

Quiz feedback:

correct answer highlight
wrong answer shake animation

---

COMPONENT STRUCTURE

Create reusable components:

components/lesson/LessonContainer.vue
components/lesson/StorySlide.vue
components/lesson/QuizSlide.vue
components/lesson/NextButton.vue
components/lesson/CompletionScreen.vue

---

PAGE STRUCTURE

pages/lesson/[id].vue

This page loads lesson data and controls slide flow.

---

STATE MANAGEMENT

Use reactive state for:

currentSlideIndex
selectedAnswer
lessonCompleted

---

CODE QUALITY

Use TypeScript.

Keep components small and reusable.

Do not hardcode lesson content.

Always load from JSON.

---

FUTURE EXTENSIBILITY

Design the system so new slide types can be added easily.

Possible future slides:

image
video
mini-game
map
drag-and-drop quiz

---

GOAL

The lesson system should behave like a story-driven learning experience similar to Duolingo but for Vietnamese history.
