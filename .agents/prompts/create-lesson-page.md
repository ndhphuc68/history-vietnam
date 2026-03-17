You are a senior frontend architect and AI-assisted UI builder.

Your task is to build a scalable lesson system for a children's Vietnamese history learning website.

---

TECH STACK

Nuxt 3
TypeScript
TailwindCSS
Pinia

Use Vue 3 Composition API with <script setup>.

---

PROJECT GOAL

The application teaches Vietnamese history through interactive, story-driven lessons.

Each lesson behaves like a mini storybook with illustrations and quizzes.

---

CONTENT STRUCTURE

Lessons are stored as JSON files:

content/lessons/

Example:

content/lessons/van-lang.json

Each lesson contains:

id
title
summary
slides

Each slide can be:

story
quiz

Story slide structure:

{
  "type": "story",
  "text": "Cách đây hàng nghìn năm...",
  "imagePrompt": "ancient Vietnamese village, rice fields, children book illustration, cartoon style, bright colors"
}

Quiz slide structure:

{
  "type": "quiz",
  "question": "Ai là vua đầu tiên?",
  "options": ["Hùng Vương","Ngô Quyền","Lê Lợi"],
  "answer": "Hùng Vương"
}

---

IMAGE GENERATION RULES

Each story slide MUST include an imagePrompt.

Images are generated automatically if not موجود.

Images must be saved to:

public/images/history/{lesson-id}/{slide-index}.png

Example:

public/images/history/van-lang/1.png

Image style:

children book illustration
cartoon style
flat design
bright colors
simple shapes
friendly characters

DO NOT include text inside images.

---

IMAGE RENDERING RULES

Story slides must display:

image (top)
text (bottom)

Image requirements:

aspect ratio: 16:9
object-fit: contain
centered content
rounded corners

---

LESSON FLOW

Intro screen
Story slides (with images)
Quiz slides
Completion screen

---

ROUTING

/lesson/[id]

Example:

/lesson/van-lang

---

PAGE RESPONSIBILITY

The lesson page must:

load lesson JSON dynamically
render slides sequentially
track currentSlideIndex
handle next navigation
handle quiz selection
show completion screen

---

STATE MANAGEMENT

Use reactive state:

currentSlideIndex
selectedAnswer
lessonCompleted

---

DYNAMIC SLIDES

Use dynamic components:

<component :is="slideComponent" :slide="slide" />

---

COMPONENT STRUCTURE

components/lesson/

LessonContainer.vue
StorySlide.vue
QuizSlide.vue
NextButton.vue
CompletionScreen.vue

---

STORY SLIDE REQUIREMENTS

StorySlide must:

display generated image
display text clearly
animate on enter

Layout:

image on top
text below
centered content

---

QUIZ SLIDE REQUIREMENTS

QuizSlide must:

show question
show large answer buttons
highlight correct answer
animate wrong answer

---

UI DESIGN

Child-friendly design:

large fonts
rounded cards
soft shadows
bright colors
big spacing

Mobile-first layout.

---

ANIMATION

Slide transition:

horizontal slide
duration 300ms

Buttons:

hover scale
tap feedback

Quiz:

correct = highlight green
wrong = shake animation

---

CODE QUALITY

Use TypeScript

Do not hardcode data

Always load from JSON

Keep components reusable

---

EXTENSIBILITY

The system must support adding new slide types:

image
video
mini-game
map
drag-and-drop

---

GOAL

Build a Duolingo-like experience for learning Vietnamese history,
where each lesson is a visual story with illustrations and interaction.

The system must support AI-generated images seamlessly.