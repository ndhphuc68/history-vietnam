import fs from 'fs';
import path from 'path';

const contentDir = 'd:/history-vietnam/content/lessons';
const folderToEraMap = {
  'era1-founding': 'founding',
  'era2-northern-domination': 'northern-domination',
  'era3-autonomy': 'autonomy',
  'era4-building': 'building',
  'era5-independence-restored': 'independence-restored',
  'era6-resistance': 'resistance',
  'era7-modern-movement': 'patriotic-movements',
  'era8-ho-chi-minh': 'ho-chi-minh-era',
  'era9-anti-us': 'anti-us-war',
  'era10-unified': 'unified-vietnam'
};

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const folderName = path.basename(dir);
  const eraId = folderToEraMap[folderName];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name.endsWith('.json')) {
      if (!eraId) continue; // Skip if no mapping for this folder

      const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      const lessonId = content.id;

      // Update main thumbnail
      if (content.image) {
        content.image = `/images/history/thumbnails/${eraId}/${lessonId}.png`;
      }

      // Update slides
      if (content.slides) {
        content.slides.forEach((slide, index) => {
          if (slide.image) {
            // Some slides might use the lesson thumbnail, but usually they are specific
            // If the path looks like /images/history/lessonId/x.png, update it
            if (slide.image.includes(`/images/history/${lessonId}/`)) {
              slide.image = `/images/history/lessons/${eraId}/${lessonId}/${index}.png`;
            } else if (slide.image.startsWith('/images/history/')) {
               // Fallback or generic images in root history folder should also be updated
               // but we moved almost everything.
               // For now, let's be specific for slides.
               slide.image = `/images/history/lessons/${eraId}/${lessonId}/${index}.png`;
            }
          }
        });
      }

      fs.writeFileSync(fullPath, JSON.stringify(content, null, 2));
      console.log(`Updated: ${fullPath}`);
    }
  }
}

// Start processing from each era folder
Object.keys(folderToEraMap).forEach(folder => {
  const fullPath = path.join(contentDir, folder);
  if (fs.existsSync(fullPath)) {
    processDirectory(fullPath);
  }
});
