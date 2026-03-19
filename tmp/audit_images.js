import fs from "fs";
import path from "path";

const contentDir = "content/lessons";
const imagesDir = "public/images/history";

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const missingImages = [];

walkDir(contentDir, (filePath) => {
  if (filePath.endsWith(".json")) {
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Check main lesson image
    if (content.image) {
      const relPath = content.image.replace("/images/history/", "");
      const fullPath = path.join(imagesDir, relPath);
      if (!fs.existsSync(fullPath)) {
        missingImages.push({
          lesson: content.id,
          type: "header",
          path: content.image,
        });
      }
    }

    // Check slides
    if (content.slides) {
      content.slides.forEach((slide, index) => {
        if (slide.image) {
          const relPath = slide.image.replace("/images/history/", "");
          const fullPath = path.join(imagesDir, relPath);
          if (!fs.existsSync(fullPath)) {
            missingImages.push({
              lesson: content.id,
              type: `slide-${index}`,
              path: slide.image,
            });
          }
        }
      });
    }
  }
});

// Check heroes
const heroes = JSON.parse(fs.readFileSync("content/heroes.json", "utf8"));
heroes.forEach((hero) => {
  const relPath = hero.image.replace("/images/history/", "");
  const fullPath = path.join(imagesDir, relPath);
  if (!fs.existsSync(fullPath)) {
    missingImages.push({ hero: hero.id, type: "hero", path: hero.image });
  }
});

console.log(JSON.stringify(missingImages, null, 2));
