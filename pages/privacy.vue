<script setup lang="ts">
/**
 * Privacy Policy page.
 * Transparency for parents, safety for kids.
 */
useHead({
  title: "Chính sách bảo mật - Lịch sử Nhí",
});
</script>

<template>
  <div class="min-h-screen bg-background pt-28 pb-20 px-4 md:px-0">
    <div class="max-w-4xl mx-auto space-y-12">
      <!-- Header -->
      <div class="text-center space-y-4">
        <div
          class="inline-flex items-center justify-center w-24 h-24 bg-secondary rounded-3xl shadow-lg mb-4 transform rotate-6"
        >
          <Icon name="fluent-emoji:locked-with-key" class="text-5xl" />
        </div>
        <h1 class="text-4xl md:text-5xl font-black text-text tracking-tight">
          Chính sách <span class="text-secondary">Bảo mật</span>
        </h1>
        <p class="text-lg md:text-xl text-text/70 font-bold max-w-2xl mx-auto">
          An toàn của các bé là ưu tiên hàng đầu của chúng mình!
        </p>
      </div>

      <!-- Content Sections -->
      <div class="grid grid-cols-1 gap-8">
        <!-- Safety Badge -->
        <div
          class="bg-gradient-to-r from-secondary to-text p-1 rounded-[40px] shadow-2xl"
        >
          <div
            class="bg-white p-8 md:p-10 rounded-[38px] flex flex-col md:flex-row items-center gap-8"
          >
            <div
              class="w-32 h-32 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 animate-bounce-slow"
            >
              <Icon name="fluent-emoji:shield" class="text-6xl" />
            </div>
            <div class="space-y-4 text-center md:text-left">
              <h2 class="text-2xl font-black text-text">
                Cam kết an toàn 100%
              </h2>
              <p class="text-text/80 font-bold leading-relaxed italic">
                "Chúng mình KHÔNG thu thập dữ liệu cá nhân, KHÔNG yêu cầu đăng
                ký và KHÔNG có quảng cáo gây phiền nhiễu."
              </p>
            </div>
          </div>
        </div>

        <!-- Section 1 -->
        <div
          class="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border-t-8 border-secondary"
        >
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Icon name="fluent-emoji:no-entry" class="text-3xl text-text" />
            </div>
            <div class="space-y-4">
              <h2 class="text-2xl font-black text-text">
                1. Không thu thập dữ liệu
              </h2>
              <p class="text-text/80 font-medium leading-relaxed">
                Lịch sử Nhí hoạt động hoàn toàn dựa trên sự trải nghiệm tự do.
                Bé có thể vào xem bài học và đố vui mà không cần khai báo tên,
                tuổi hay bất kỳ thông tin cá nhân nào.
              </p>
            </div>
          </div>
        </div>

        <!-- Section 2 -->
        <div
          class="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border-t-8 border-accent"
        >
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Icon
                name="fluent-emoji:magnifying-glass-tilted-left"
                class="text-3xl text-amber-900"
              />
            </div>
            <div class="space-y-4">
              <h2 class="text-2xl font-black text-text">
                2. Lưu tiến trình trên thiết bị
              </h2>
              <p class="text-text/80 font-medium leading-relaxed">
                Để bé có thể tiếp tục hành trình vào lần sau, ứng dụng có thể
                lưu một chút dữ liệu tiến trình (ví dụ: bài đã hoàn thành, thẻ
                anh hùng đã mở khóa) **ngay trên thiết bị của bé** (Local
                Storage). Chúng mình không gửi dữ liệu này lên máy chủ.
              </p>
            </div>
          </div>
        </div>

        <!-- Section 3 -->
        <div
          class="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border-t-8 border-primary"
        >
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Icon name="fluent-emoji:link" class="text-3xl text-primary" />
            </div>
            <div class="space-y-4">
              <h2 class="text-2xl font-black text-text">
                3. Liên kết bên ngoài
              </h2>
              <p class="text-text/80 font-medium leading-relaxed">
                Mọi liên kết dẫn ra ngoài (nếu có) đều được chúng mình kiểm
                duyệt rất kỹ để đảm bảo nội dung đó phù hợp và an toàn cho trẻ
                em. Tuy nhiên, ba mẹ hãy luôn đồng hành cùng bé khi bé sử dụng
                internet nhé!
              </p>
            </div>
          </div>
        </div>

        <!-- Section 4 -->
        <div
          class="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border-t-8 border-text"
        >
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 bg-text/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Icon
                name="fluent-emoji:family-man-woman-girl-boy"
                class="text-3xl text-text"
              />
            </div>
            <div class="space-y-4">
              <h2 class="text-2xl font-black text-text">
                4. Dành cho Phụ huynh
              </h2>
              <p class="text-text/80 font-medium leading-relaxed">
                Chúng mình khuyến khích ba mẹ dành thời gian khám phá ứng dụng
                cùng con. Nếu ba mẹ có bất kỳ thắc mắc hay góp ý nào về bảo mật,
                hãy liên hệ với chúng mình qua email hỗ trợ nhé.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-bounce-slow {
  animation: bounce 3s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
