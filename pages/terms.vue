<script setup lang="ts">
/**
 * Terms of Service page.
 * Friendly, clear rules for children and parents.
 */
useHead({
  title: "Điều khoản sử dụng",
});

useSeoMeta({
  title: "Điều khoản sử dụng - Lịch sử Nhí",
  ogTitle: "Điều khoản sử dụng - Lịch sử Nhí",
  description:
    "Các quy định và hướng dẫn sử dụng ứng dụng Lịch sử Nhí một cách an toàn và hiệu quả cho bé và phụ huynh.",
  ogDescription:
    "Luật chơi công bằng cho hành trình khám phá lịch sử đầy thú vị.",
  ogImage: "/images/banner/banner.png",
});
</script>

<template>
  <div class="min-h-screen bg-background pt-28 pb-20 px-4 md:px-0">
    <div class="max-w-4xl mx-auto space-y-12">
      <!-- Header -->
      <div class="text-center space-y-4">
        <div
          class="inline-flex items-center justify-center w-24 h-24 bg-accent rounded-3xl shadow-lg mb-4 transform -rotate-6"
        >
          <Icon name="fluent-emoji:scroll" class="text-5xl" />
        </div>
        <h1 class="text-4xl md:text-5xl font-black text-text tracking-tight">
          Điều khoản <span class="text-primary">Sử dụng</span>
        </h1>
        <p class="text-lg md:text-xl text-text/70 font-bold max-w-2xl mx-auto">
          Những "luật chơi" nhỏ để chúng mình cùng nhau khám phá lịch sử một
          cách vui vẻ nhất!
        </p>
      </div>

      <!-- Content Sections -->
      <div class="grid grid-cols-1 gap-8">
        <!-- Section 1 -->
        <div
          class="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border-b-8 border-accent transform hover:scale-[1.01] transition-transform"
        >
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Icon
                name="fluent-emoji:sparkles"
                class="text-3xl text-amber-900"
              />
            </div>
            <div class="space-y-4">
              <h2 class="text-2xl font-black text-text">
                1. Mục đích của Lịch sử Nhí
              </h2>
              <p class="text-text/80 font-medium leading-relaxed">
                Trang web này được tạo ra để giúp các bé tìm hiểu về lịch sử
                Việt Nam qua những câu chuyện, hình ảnh và trò chơi đố vui sinh
                động. Mọi nội dung đều hướng đến sự giáo dục và khơi gợi niềm tự
                hào dân tộc.
              </p>
            </div>
          </div>
        </div>

        <!-- Section 2 -->
        <div
          class="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border-b-8 border-secondary transform hover:scale-[1.01] transition-transform"
        >
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Icon name="fluent-emoji:shield" class="text-3xl text-text" />
            </div>
            <div class="space-y-4">
              <h2 class="text-2xl font-black text-text">
                2. Quyền sở hữu nội dung
              </h2>
              <p class="text-text/80 font-medium leading-relaxed">
                Tất cả hình ảnh và câu chuyện trên trang web đều thuộc bản quyền
                của **Lịch sử Nhí**. Các bé và phụ huynh có thể tự do xem và học
                tập, nhưng vui lòng không sao chép hoặc sử dụng cho mục đích
                thương mại khi chưa có sự cho phép nhé.
              </p>
            </div>
          </div>
        </div>

        <!-- Section 3 -->
        <div
          class="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border-b-8 border-primary transform hover:scale-[1.01] transition-transform"
        >
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Icon name="fluent-emoji:rocket" class="text-3xl text-primary" />
            </div>
            <div class="space-y-4">
              <h2 class="text-2xl font-black text-text">
                3. Trách nhiệm người dùng
              </h2>
              <p class="text-text/80 font-medium leading-relaxed">
                Chúng mình mong muốn tạo ra một môi trường học tập tích cực. Các
                bé hãy sử dụng trang web một cách văn minh, góp ý chân thành để
                chúng mình ngày càng hoàn thiện hơn.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Note -->
      <div
        class="text-center p-8 bg-text/5 rounded-[30px] border-2 border-dashed border-text/20"
      >
        <p class="text-text/60 font-bold italic">
          Nếu có bất kỳ câu hỏi nào, ba mẹ hãy liên hệ với chúng mình qua địa
          chỉ email ở chân trang nhé!
        </p>
      </div>
    </div>
  </div>
</template>
