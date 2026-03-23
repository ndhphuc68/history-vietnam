# Lịch sử Nhí (History Vietnam)

Ứng dụng học **Lịch sử Việt Nam** theo dạng:
- **Bản đồ hành trình** (timeline/map)
- **Bài học dạng slide** (story + quiz)
- **Bộ sưu tập anh hùng** (mở khóa theo tiến trình)

Tech stack: **Nuxt 4 + Vue 3 + TailwindCSS + Pinia**.

## Chạy dự án

```bash
pnpm install
pnpm dev
```

Mặc định chạy ở `http://localhost:3000`.

## Build/Preview

```bash
pnpm build
pnpm preview
```

## Cấu trúc dữ liệu nội dung

- **Bản đồ thời kỳ**: `content/history-map.json`
  - Gồm các `eras[]`, mỗi era có `levels[]`
  - Mỗi level trỏ tới `lesson` (id bài học)

- **Bài học**: `content/lessons/**/*.json`
  - Shape type theo `types/history.ts` (`LessonContent`, `Slide`)
  - `slides[]` là union:
    - `type: "story"` + `text`, `image`
    - `type: "quiz"` + `question`, `options`, `answer`

- **Anh hùng**: `content/heroes.json`
  - Shape type theo `types/history.ts` (`Hero`)

## Thêm một bài học mới (quick guide)

1. Tạo file JSON trong `content/lessons/<era>/my-lesson.json`
   - `id` nên khớp filename: `my-lesson`
2. Thêm node vào `content/history-map.json` ở đúng era:
   - `lesson: "my-lesson"`
   - `id` thường trùng với `lesson` để map ảnh dễ hơn
3. Thêm ảnh minh hoạ:
   - Node trên map dùng: `public/images/history/<id>.png`
   - Ảnh cover lesson dùng theo `LessonContent.image`

## Lưu tiến trình

- Tiến trình học (bài đã hoàn thành, badge…) được lưu **trên thiết bị** bằng `localStorage`.
- Mở khóa anh hùng cũng được lưu local trong `heroStore`.

## Ghi chú

- Trang **Báo lỗi**: `pages/report.vue` (nhớ thay email nhận báo lỗi trước khi public).

## Deploy Cloudflare Pages

Dự án dùng Nitro preset **`cloudflare-pages`** (`nuxt.config.ts` → `nitro.preset`).

### Lỗi thường gặp: `wrangler deploy` + thông báo về `main` / `assets`

- **`wrangler deploy`** là lệnh deploy **Cloudflare Workers** (cần entry `main` hoặc cấu hình `assets`).
- Với Nuxt preset **cloudflare-pages**, sau `pnpm build` bạn phải deploy **Pages**, không phải Workers:

```bash
pnpm build
pnpm exec wrangler pages deploy .output/public
# hoặc: pnpm deploy:pages
```

### Cloudflare Dashboard (Git)

- **Build command**: `pnpm install && pnpm build` (hoặc tương đương trên CI)
- **Build output directory**: **`.output/public`** (quan trọng — không phải `dist`)

File `wrangler.toml` trong repo đã khai báo `pages_build_output_dir = ".output/public"` để Wrangler/CI dễ đồng bộ.
