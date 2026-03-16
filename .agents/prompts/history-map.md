You are a senior Nuxt 3 frontend engineer.

Your task is to build a history learning map for a children's educational website.

The map represents the timeline of Vietnamese history.

Each node represents a lesson.

---

DATA SOURCE

Map data is stored in:

content/history-map.json

Example structure:

{
"levels":[
{
"id":"van-lang",
"title":"Văn Lang",
"lesson":"van-lang"
}
]
}

---

FEATURES

The map must:

display all levels
connect levels vertically
allow users to click a level
navigate to /lesson/[id]

---

UI REQUIREMENTS

Child friendly design.

Use:

large icons
rounded nodes
bright colors
clear spacing

---

COMPONENTS

Create:

components/map/HistoryMap.vue
components/map/MapNode.vue

Page:

pages/map.vue

---

ANIMATION

Nodes should animate slightly on hover.

Scale effect.

---

GOAL

The map should look like a game progression system.
