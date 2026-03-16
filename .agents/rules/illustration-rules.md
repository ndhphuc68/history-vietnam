---
trigger: always_on
---

# Illustration Rules

All history lessons must include an illustration.

Images must be stored in:

public/images/history/

File name format:

{lesson-id}.png

Example:

hung-kings.png
hai-ba-trung.png
ngo-quyen.png

---

# Illustration Style

Illustrations must follow a consistent style suitable for children.

Style rules:

children book illustration  
cartoon style  
flat design  
bright colors  
simple shapes

Avoid:

realistic images  
dark or violent scenes  
complex details

---

# Prompt Template

When generating illustrations use the following prompt structure:

children educational illustration  
Vietnamese history  
{event description}  
cartoon style  
bright colors  
flat design  
storybook illustration
text vietnamese

---

# Lesson Integration

Each lesson JSON must contain an image field.

Example:

{
"id": "hung-kings",
"title": "Các vua Hùng lập nước Văn Lang",
"summary": "Các vua Hùng lập nên nhà nước đầu tiên của người Việt.",
"image": "/images/history/hung-kings.png",
"slides": []
}

---

# Story Slide Layout

Story slides must display:

illustration  
text

Layout:

image on top  
text below
