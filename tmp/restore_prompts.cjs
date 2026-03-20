const fs = require("fs");
const path = require("path");

function generatePrompt(eventDescription) {
  const template =
    "children educational illustration, Vietnamese history, {description}, cartoon style, bright colors, flat design, storybook illustration, text vietnamese";
  return template.replace("{description}", eventDescription);
}

const contentDir = "content/lessons";
const imagesDir = "public/images/history";
const outputDir = "tmp/prompts";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const groupedPrompts = {};

function walk(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((f) => {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (f.endsWith(".json")) {
      try {
        const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));
        let era = path.basename(path.dirname(fullPath));
        if (era === "lessons") era = "General";

        if (!groupedPrompts[era]) groupedPrompts[era] = {};

        const lessonId = data.id || path.basename(f, ".json");
        const lessonPrompts = [];

        if (data.image) {
          const rel = data.image.replace("/images/history/", "");
          const imgPath = path.join(imagesDir, rel.replace(/\//g, path.sep));
          if (!fs.existsSync(imgPath)) {
            lessonPrompts.push(
              `TYPE: Thumbnail\nFILE: ${data.image}\nPROMPT: ${generatePrompt(data.summary || data.title)}\n`,
            );
          }
        }

        if (data.slides) {
          data.slides.forEach((s, i) => {
            if (s.type === "story" && s.image) {
              const rel = s.image.replace("/images/history/", "");
              const imgPath = path.join(
                imagesDir,
                rel.replace(/\//g, path.sep),
              );
              if (!fs.existsSync(imgPath)) {
                lessonPrompts.push(
                  `TYPE: Slide ${i}\nFILE: ${s.image}\nPROMPT: ${s.imagePrompt || generatePrompt(s.text)}\n`,
                );
              }
            }
          });
        }

        if (lessonPrompts.length > 0) {
          groupedPrompts[era][data.title || lessonId] = lessonPrompts;
        }
      } catch (e) {}
    }
  });
}

walk(contentDir);

for (const era in groupedPrompts) {
  let fileContent = `# Prompts for Era: ${era}\n\n`;
  for (const [lessonTitle, prompts] of Object.entries(groupedPrompts[era])) {
    fileContent += `## Lesson: ${lessonTitle}\n\n${prompts.join("\n")}\n---\n\n`;
  }
  fs.writeFileSync(path.join(outputDir, `${era}.txt`), fileContent, "utf8");
}
console.log("Restored grouped prompts in tmp/prompts/");
