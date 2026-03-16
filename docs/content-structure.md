# Content Structure

## Vietnamese History Learning App

This document defines the content structure used for lessons.

All historical content must follow this structure.

This ensures the UI can render lessons consistently.

---

# 1. Lesson Structure

Each lesson must contain:

Lesson Intro
Story Slides
Quiz
Completion

Structure:

Lesson
├ Intro
├ Slides
├ Quiz
└ Result

---

# 2. Lesson Intro

Intro introduces the historical topic.

Fields:

title
hero
shortDescription
illustration

Example:

title: Battle of Bach Dang
hero: Ngo Quyen
shortDescription: Ngo Quyen defeated the Southern Han fleet.

---

# 3. Story Slides

Slides tell the historical story.

Rules:

Each slide must contain:

illustration
text

Text rules:

1–2 sentences only

Maximum slides per lesson:

5

Example:

Slide 1

text: The Southern Han army invaded Vietnam.

Slide 2

text: Ngo Quyen prepared a clever strategy.

Slide 3

text: Wooden stakes were placed under the river.

Slide 4

text: The enemy fleet was defeated.

---

# 4. Quiz Structure

Each lesson must end with a quiz.

Fields:

question
options
correctAnswer
explanation

Example:

question:

Who defeated the Southern Han fleet?

options:

Ngo Quyen
Tran Hung Dao
Ly Thuong Kiet

correctAnswer:

Ngo Quyen

explanation:

Ngo Quyen used wooden stakes in the Bach Dang river to defeat the enemy.

---

# 5. Hero Unlock

Lessons may unlock heroes.

Hero fields:

name
title
achievement
illustration

Example:

name: Ngo Quyen

title: King of Vietnam

achievement: Victory at Bach Dang

---

# 6. Lesson Completion

After finishing a lesson:

System should show:

completion message
progress update
optional hero unlock

Example message:

Lesson complete!

You learned about the Battle of Bach Dang.

---

# 7. Content Length Rules

Story text must be short.

Maximum:

2 sentences per slide

Avoid:

long paragraphs
complex language

---

# 8. Language Rules

Language must be simple.

Rules:

- short sentences
- simple vocabulary
- clear storytelling

Avoid academic writing style.

---

# 9. Visual Priority

Images must carry most of the story.

Each slide should contain:

large illustration
minimal text

---

# 10. Content Consistency

All lessons must follow the same structure.

Avoid creating custom lesson formats.

Consistency ensures the UI can render lessons automatically.
