<script setup lang="ts">
useHead({
  title: "Báo lỗi - Lịch sử Nhí",
  meta: [
    {
      name: "description",
      content:
        "Gửi góp ý hoặc báo lỗi để Lịch sử Nhí ngày càng tốt hơn cho các bé.",
    },
  ],
});

const route = useRoute();

const subject = computed(() => {
  const path = typeof route.fullPath === "string" ? route.fullPath : "/";
  return `[Lịch sử Nhí] Báo lỗi (${path})`;
});

const body = computed(() => {
  return [
    "Mô tả lỗi:",
    "- (Bạn mô tả ngắn gọn lỗi gặp phải)",
    "",
    "Các bước để gặp lỗi:",
    "1) ...",
    "2) ...",
    "",
    "Thiết bị/Trình duyệt:",
    "- Windows/macOS/iOS/Android, Chrome/Edge/Safari...",
    "",
    "Ảnh chụp màn hình (nếu có):",
    "- ...",
  ].join("\n");
});

const mailtoHref = computed(() => {
  // TODO: thay email của bạn ở đây khi publish
  const to = "phucndh@example.com";
  return `mailto:${to}?subject=${encodeURIComponent(
    subject.value,
  )}&body=${encodeURIComponent(body.value)}`;
});
</script>

<template>
  <div class="min-h-screen bg-background pt-28 pb-20 px-4 md:px-0">
    <div class="max-w-3xl mx-auto space-y-10">
      <div class="text-center space-y-4">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl shadow-lg mb-4 transform rotate-3"
        >
          <Icon name="fluent-emoji:wrench" class="text-4xl" />
        </div>
        <h1 class="text-4xl md:text-5xl font-black text-text tracking-tight">
          Báo lỗi <span class="text-primary">nhanh</span>
        </h1>
        <p class="text-lg md:text-xl text-text/70 font-bold">
          Cảm ơn bạn đã giúp Lịch sử Nhí tốt hơn cho các bé.
        </p>
      </div>

      <div
        class="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border-t-8 border-primary"
      >
        <div class="space-y-6">
          <div class="space-y-2">
            <h2 class="text-2xl font-black text-text">
              Gợi ý nội dung khi báo lỗi
            </h2>
            <ul class="list-disc pl-6 text-text/80 font-medium leading-relaxed">
              <li>Bạn đang ở trang nào (mình sẽ tự điền trong email)</li>
              <li>Các bước để tái hiện lỗi</li>
              <li>Ảnh chụp màn hình (nếu có)</li>
            </ul>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <a
              :href="mailtoHref"
              class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-white font-black rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Gửi email báo lỗi
              <Icon name="fluent-emoji:envelope" class="text-xl" />
            </a>
            <NuxtLink
              to="/"
              class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-text font-black rounded-2xl shadow-lg border-2 border-text/10 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Quay về trang chủ
              <Icon name="fluent-emoji:house" class="text-xl" />
            </NuxtLink>
          </div>

          <p class="text-xs text-text/50 font-bold italic">
            Lưu ý: hãy thay email nhận báo lỗi trong `pages/report.vue` trước
            khi public.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
