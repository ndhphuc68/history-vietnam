const fs = require("fs");
const path = require("path");

const STYLE_PREFIX =
  "children's book illustration, flat vector style, sunlit gold and emerald color palette, clean outlines, storybook aesthetic, friendly atmosphere, Vietnamese history context, ";
const THUMB_SUFFIX =
  ", landscape orientation, 16:9 aspect ratio, --ar 16:9, flat design, bright and vibrant colors, soft lighting, educational feel";
const SLIDE_SUFFIX =
  ", portrait orientation, vertical layout, 2:3 aspect ratio, --ar 2:3, flat design, bright and vibrant colors, soft lighting, educational feel";

function getShortCaption(text, maxLength = 30) {
  if (!text) return "";
  // Pick the first few words or the whole sentence if short
  const words = text.split(" ");
  let caption = words.slice(0, 4).join(" ");
  if (caption.length > maxLength)
    caption = caption.substring(0, maxLength).trim();
  return caption;
}

function generatePrompt(
  eventDescription,
  isThumbnail = false,
  vietnameseText = "",
) {
  const textOverlay = vietnameseText
    ? `, with Vietnamese text overlay: "${vietnameseText}" in a playful educational font`
    : "";
  const suffix = isThumbnail ? THUMB_SUFFIX : SLIDE_SUFFIX;
  return STYLE_PREFIX + eventDescription + textOverlay + suffix;
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
            const caption = data.title;
            lessonPrompts.push(
              `TYPE: Thumbnail (16:9)\nFILE: ${data.image}\nPROMPT: ${generatePrompt(data.summary || data.title, true, caption)}\n`,
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
                const caption = getShortCaption(s.text);
                lessonPrompts.push(
                  `TYPE: Slide ${i} (Vertical)\nFILE: ${s.image}\nPROMPT: ${generatePrompt(s.imagePrompt || s.text, false, caption)}\n`,
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

let masterContent = `# MASTER PROMPT LIST (All 296+ Missing Images)\n\n`;
masterContent += `> NOTICE: This file contains ALL missing images in one place, optimized for bulk generation.\n\n`;

for (const era in groupedPrompts) {
  let fileContent = `# Prompts with STRENGTHENED CONSISTENCY: ${era}\n\n`;
  fileContent += `> NOTICE: All prompts now use the Master Style Prefix and Suffix for visual unity.\n\n`;

  masterContent += `## ERA: ${era}\n\n`;

  for (const [lessonTitle, prompts] of Object.entries(groupedPrompts[era])) {
    const lessonBlock = `### Lesson: ${lessonTitle}\n\n${prompts.join("\n")}\n---\n\n`;
    fileContent += lessonBlock;
    masterContent += lessonBlock;
  }

  fs.writeFileSync(path.join(outputDir, `${era}.txt`), fileContent, "utf8");
}

fs.writeFileSync("tmp/ALL_MISSING_PROMPTS.txt", masterContent, "utf8");
console.log(
  "Updated all individual Era prompts and generated MASTER PROMPT LIST at tmp/ALL_MISSING_PROMPTS.txt",
);
